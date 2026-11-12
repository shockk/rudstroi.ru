"""Подготовка фото объектов для сайта: выравнивание вертикалей, цвет, WebP.

Использование:
    python scripts/enhance_photos.py photos-raw/vhodnye-gruppy public/images/vhodnye-gruppy names.json

names.json — соответствие «исходный файл → имя на сайте» и ручные поправки:
    {"9.jpg": {"name": "kryltso-polukrugloe-gotovo", "angle": null}}
angle: null — определить наклон автоматически, число — повернуть на столько градусов
(плюс — против часовой стрелки), 0 — не поворачивать.

Нужны opencv-python-headless и numpy.
"""

import json
import math
import sys
from pathlib import Path

import cv2
import numpy as np

MAX_SIDE = 1600
MAX_AUTO_ANGLE = 6.0  # больше — скорее всего ошибка детектора, не трогаем


def detect_tilt(img: np.ndarray) -> tuple[float, str]:
    """Наклон по вертикальным линиям (стены, двери, колонны). Возвращает угол поворота."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape
    scale = 1000 / max(h, w)
    small = cv2.resize(gray, None, fx=scale, fy=scale, interpolation=cv2.INTER_AREA)
    edges = cv2.Canny(cv2.GaussianBlur(small, (3, 3), 0), 60, 160)
    lines = cv2.HoughLinesP(edges, 1, np.pi / 720, threshold=60, minLineLength=small.shape[0] // 8, maxLineGap=6)
    if lines is None:
        return 0.0, 'нет линий'

    devs, weights = [], []
    for x1, y1, x2, y2 in np.asarray(lines).reshape(-1, 4):
        dx, dy = x2 - x1, y2 - y1
        length = math.hypot(dx, dy)
        ang = math.degrees(math.atan2(dx, dy))  # 0 = вертикаль
        if ang > 90:
            ang -= 180
        if ang < -90:
            ang += 180
        if abs(ang) < 8:
            devs.append(ang)
            weights.append(length)

    if sum(weights) < small.shape[0] * 0.35:
        return 0.0, 'мало вертикалей'

    order = np.argsort(devs)
    d, wts = np.array(devs)[order], np.array(weights)[order]
    median = float(d[np.searchsorted(np.cumsum(wts), wts.sum() / 2)])
    # Линия наклонена вправо сверху (dx>0 при движении вниз) → повернуть по часовой
    return -median, f'вертикали: {len(devs)} линий'


def rotate_and_crop(img: np.ndarray, angle: float) -> np.ndarray:
    if abs(angle) < 0.15:
        return img
    h, w = img.shape[:2]
    m = cv2.getRotationMatrix2D((w / 2, h / 2), angle, 1.0)
    rotated = cv2.warpAffine(img, m, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
    # Наибольший прямоугольник без пустых углов
    a = math.radians(abs(angle))
    sin_a, cos_a = math.sin(a), math.cos(a)
    if w <= h:
        side_long, side_short = h, w
    else:
        side_long, side_short = w, h
    if side_short <= 2 * sin_a * cos_a * side_long:
        x = 0.5 * side_short
        wr, hr = (x / sin_a, x / cos_a) if w >= h else (x / cos_a, x / sin_a)
    else:
        cos_2a = cos_a * cos_a - sin_a * sin_a
        wr, hr = (w * cos_a - h * sin_a) / cos_2a, (h * cos_a - w * sin_a) / cos_2a
    wr, hr = int(wr) - 2, int(hr) - 2
    x0, y0 = (w - wr) // 2, (h - hr) // 2
    return rotated[y0 : y0 + hr, x0 : x0 + wr]


def fix_colors(img: np.ndarray) -> np.ndarray:
    f = img.astype(np.float32)

    # Баланс белого по нейтральным пикселям (белые стены, серая плитка, бетон).
    # «Серый мир» по всему кадру не годится: трава и красный клинкер сбивают цвет.
    hsv0 = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    neutral = (hsv0[..., 1] < 45) & (hsv0[..., 2] > 70) & (hsv0[..., 2] < 245)
    if neutral.mean() > 0.03:
        means = f[neutral].mean(axis=0)
        gain = means.mean() / means
        gain = np.clip(1 + (gain - 1) * 0.7, 0.85, 1.18)
        f *= gain

    # Уровни: растягиваем по 0.5% / 99.7% перцентилям яркости
    lum = f.mean(axis=2)
    lo, hi = np.percentile(lum, 0.5), np.percentile(lum, 99.7)
    f = (f - lo) * (245.0 / max(hi - lo, 1))
    f = np.clip(f, 0, 255).astype(np.uint8)

    # Мягкий локальный контраст по яркости (CLAHE) — вытягивает тени, не трогая цвет
    lab = cv2.cvtColor(f, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    l2 = cv2.createCLAHE(clipLimit=1.6, tileGridSize=(8, 8)).apply(l)
    l = cv2.addWeighted(l, 0.5, l2, 0.5, 0)
    f = cv2.cvtColor(cv2.merge([l, a, b]), cv2.COLOR_LAB2BGR)

    # «Вибрация»: бледные цвета чуть насыщеннее, уже яркие (трава) почти не трогаем
    hsv = cv2.cvtColor(f, cv2.COLOR_BGR2HSV).astype(np.float32)
    s = hsv[..., 1]
    hsv[..., 1] = np.clip(s * (1 + 0.18 * (1 - s / 255)), 0, 255)
    f = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)

    # Лёгкая резкость
    blur = cv2.GaussianBlur(f, (0, 0), 1.2)
    return cv2.addWeighted(f, 1.35, blur, -0.35, 0)


def main() -> None:
    src, out, names_file = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
    out.mkdir(parents=True, exist_ok=True)
    names = json.loads(names_file.read_text(encoding='utf-8'))
    for file, spec in names.items():
        img = cv2.imread(str(src / file))
        if img is None:
            print(f'{file}: не удалось открыть')
            continue
        for x0, y0, x1, y1 in spec.get('blur', []):
            # Размытие (номера машин, лица): [x0, y0, x1, y1] в долях от размера исходника
            h0, w0 = img.shape[:2]
            a, b, c, d = int(x0 * w0), int(y0 * h0), int(x1 * w0), int(y1 * h0)
            region = img[b:d, a:c]
            small = cv2.resize(region, (max(1, (c - a) // 8), max(1, (d - b) // 8)), interpolation=cv2.INTER_AREA)
            img[b:d, a:c] = cv2.GaussianBlur(cv2.resize(small, (c - a, d - b), interpolation=cv2.INTER_LINEAR), (0, 0), 4)
        if spec.get('crop_bottom'):
            img = img[: img.shape[0] - int(spec['crop_bottom'])]
        if spec.get('crop'):
            # [x0, y0, x1, y1] в долях от размера кадра
            x0, y0, x1, y1 = spec['crop']
            h0, w0 = img.shape[:2]
            img = img[int(y0 * h0) : int(y1 * h0), int(x0 * w0) : int(x1 * w0)]
        auto, why = detect_tilt(img)
        angle = spec.get('angle')
        if angle is None:
            angle = auto if abs(auto) <= MAX_AUTO_ANGLE else 0.0
        img = fix_colors(rotate_and_crop(img, angle))
        h, w = img.shape[:2]
        k = min(1.0, MAX_SIDE / max(h, w))
        if k < 1:
            img = cv2.resize(img, None, fx=k, fy=k, interpolation=cv2.INTER_AREA)
        target = out / f"{spec['name']}.webp"
        cv2.imwrite(str(target), img, [cv2.IMWRITE_WEBP_QUALITY, 82])
        print(f"{file} → {target.name}: авто {auto:+.2f}° ({why}), применено {angle:+.2f}°, {img.shape[1]}x{img.shape[0]}, {target.stat().st_size // 1024} КБ")


if __name__ == '__main__':
    main()
