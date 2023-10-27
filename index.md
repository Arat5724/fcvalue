---
title: ""
layout: splash
permalink: /
description: "FC 온라인 아이템 분석/시뮬레이터"
excerpt: "FC 온라인 아이템 분석/시뮬레이터"
feature_row1:
  - image_path: https://fo4.dn.nexoncdn.co.kr/live/externalAssets/shop/items/product/105_s.png
    title: "FC 효율"
    url: /general-product
  - image_path: https://fo4.dn.nexoncdn.co.kr/live/externalAssets/shop/items/product/101_s.png
    title: "FC 효율(1개 구매 시)"
    url: /general-product-1
  - image_path: /assets/images/mileage.png
    title: "MP 효율"
    url: /mileage-product
feature_row2:
  - image_path: https://fo4.dn.nexoncdn.co.kr/live/externalAssets/shop/items/usePack/201704339_s.png
    title: "상자"
    url: /box
  - image_path: https://fo4.dn.nexoncdn.co.kr/live/externalAssets/shop/items/playerPack/200235004_s.png
    title: "선수팩"
    url: /player
  - image_path: https://fo4.dn.nexoncdn.co.kr/live/externalAssets/shop/items/usePack/200357000_s.png
    title: "BP 카드"
    url: /bp
---

## 최근 업데이트 : {{ "now" | date: "%Y-%m-%d %H시"}}

<details>
<summary>공지사항</summary>
<div markdown="1">
  - 목요일 제외 매일 0시 ~ 1시에 갱신됩니다.
  - 가격을 갱신하는 동안 사이트 접속이 원할하지 않을 수 있습니다.
  - 기댓값/효율은 수수료 쿠폰 30% 사용을 기준으로 계산합니다.
  - 기댓값/효율을 계산하는 동안 가격이 변동되는 경우 오차가 있을 수 있습니다.
  - 확률표보다 생성 가능 선수가 적은 경우, 생성 가능 선수들로만 기댓값을 계산해, 오차가 있을 수 있습니다.
</div>
</details>

## [강화 시뮬레이터 바로가기](/simulator/upgrade)

## 2023-10-26 로스터 업데이트 반영 완료
- 8강 최대 배율 조정으로 인해 8강 포함 선수팩의 가격이 변동될 확률이 높습니다.

## 오늘의 효율 TOP3

{% include high_rank %}

## 효율

{% include feature_row id="feature_row1" %}

## 기댓값

{% include feature_row id="feature_row2" %}
