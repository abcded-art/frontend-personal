import numpy as np
import matplotlib.pyplot as plt
from PIL import Image, ImageDraw

# 설정
width, height = 400, 400  # 이미지 크기
center = (width // 2, height // 2)  # 중심점
radii = np.linspace(0, min(center), 30)  # 반지름들
directions = [(0, -1), (-1, 0), (1, 0)]  # 12시, 9시, 3시 방향
frames = []

# 각 프레임 생성
for radius in radii:
    # 새로운 이미지 생성
    img = Image.new('RGB', (width, height), (255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    # 중심으로부터 광선 그리기
    for direction in directions:
        end = (int(center[0] + radius * direction[0]), int(center[1] + radius * direction[1]))
        draw.line([center, end], fill=(0, 0, 0), width=3)
    
    # 프레임 추가
    frames.append(img)

# GIF 저장
frames[0].save('./radiating_beam.gif', save_all=True, append_images=frames[1:], duration=100, loop=0)