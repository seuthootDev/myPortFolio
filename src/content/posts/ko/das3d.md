---
title: "DAS3D: 3D 누출 시뮬레이션 및 센서 배치 최적화"
pubDatetime: 2025-10-31T09:00:00+09:00
period:
  start: 2023-08
  end: 2025-10
company: (주)헤르스
category: projects
tags:
  - python
  - pyside6
  - vtk
  - cfd
  - chama
description: 3D 가스 확산을 시각화하고 최적의 가스 감지기 배치를 찾아주는, 노드 기반 워크플로우 데스크톱 프로그램입니다.
mainImage: https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754533823/1123.png
ogImage: https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754533823/1123.png
---

DAS3D는 산업 시설 내 가스 누출 사고를 사전에 예방하기 위해 개발된 3D 기반의 CFD 시뮬레이션 센서 배치 최적화 시스템입니다. 시설의 3D 도면을 불러와 가스 확산 시뮬레이션 데이터를 다루고, 안전 관리의 효율성을 극대화하는 감지기 배치를 도출합니다.

- **기간**: 2023.08 – 2025.10
- **소속**: (주)헤르스 (환경부 과제)
- **역할**: 소프트웨어 개발자
- **기술 스택**: `Python 3.10`, `PySide6 (Qt)`, `VTK`, `Chama`, `OpenFOAM`, `NumPy`, `Pandas`, `MongoDB`

![DAS3D 프로젝트 개요](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754533823/1123.png)

## 목표

- 3D 도면을 기반으로 가스 확산 시뮬레이션 수행
- 최적의 센서 배치를 도출하여 안전 관리의 효율성 극대화
- VTK 기반 워크플로우 시각화 플랫폼 구축

## 데모

<video controls preload="metadata" style="width:100%" poster="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754533823/1123.png" src="https://res.cloudinary.com/dvnfrjqcr/video/upload/v1756966057/1%EB%B6%84%EC%86%8C%EA%B0%9C%EC%98%81%EC%83%81_bmwytt.mp4"></video>

영상에서 보여주는 과정입니다.

1. 3D 모델 로딩 및 시각화
2. 센서 그리드 생성
3. 확산 데이터 임포트
4. 센서 배치 최적화 및 배치 좌표 시각화
5. 가스 클라우드, 컨투어 시각화

## 주요 기능

### 워크플로우

노드 기반 워크플로우로 복잡한 분석 과정을 시각적으로 구성합니다. 각 위젯은 독립적으로 실행되며 데이터 흐름을 화면에서 추적할 수 있어 분석 과정의 가독성과 효율성이 향상됩니다. 노드를 자유롭게 추가, 연결, 수정할 수 있고, 워크플로우 엔진이 위젯 간 데이터 흐름을 관리하며 시각화 위젯으로의 데이터 전달을 자동화합니다.

![워크플로우](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754553881/1-3.png)

### 3D 모델 시각화

VTK를 활용한 고성능 3D 렌더링으로 산업 시설의 복잡한 구조를 직관적으로 표현합니다. 확대/축소, 회전으로 다양한 각도에서 모델을 분석할 수 있고, 리스케일링과 회전 변환으로 프로젝트 기준에 맞게 모델을 조정할 수 있으며, UI 조작이 즉시 렌더링 창에 반영됩니다.

![3D 모델 시각화](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754554450/2-2.png)

### 센서 배치 최적화

Chama 라이브러리를 활용한 센서 배치 최적화로 탐지 효율을 극대화합니다. 탐지 범위와 환경 변수를 종합적으로 고려해 최소한의 센서로 최대 커버리지를 확보하고, 시뮬레이션 결과를 기반으로 최적 배치안을 자동으로 제안하며, 비동기 병렬 처리로 여러 케이스를 동시에 최적화합니다.

![센서 배치 최적화](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754620354/6%EC%B8%B52_c5pqvd.png)

### 가스 클라우드

3D 가스 확산 시뮬레이션 결과를 반투명한 클라우드 형태로 시각화해 가스의 확산 범위와 농도 변화, 즉 위험 구역을 직관적으로 확인할 수 있습니다. 시간 경과에 따른 변화를 애니메이션으로 재생해 사고 시나리오 분석에 활용할 수 있으며, 특정 시나리오나 전체 시나리오를 선택해 재생할 수 있습니다.

![가스 클라우드](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754624654/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2025-08-08_12-43-51_ndpxmm.png)

### 컨투어

가스 농도 분포를 컨투어 맵으로 표현해 위험 구역을 명확하게 표시합니다. 색상 구간별로 농도 수준을 구분해 위험도를 파악하고, 평면 또는 단면 기준으로 분포를 분석해 시설 내 구역별 위험도를 비교할 수 있으며, 다층 컨투어 맵으로 시간에 따른 변화 추세를 한눈에 확인할 수 있습니다.

![컨투어](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754555354/4-3.png)

### 클립퍼

3D 모델의 특정 영역을 클리핑해 내부 구조를 자세히 분석할 수 있습니다. 모델 외부를 잘라내 내부 장치와 배관 구조를 쉽게 확인하고, 복잡한 구조물의 내부를 단계적으로 노출해 점진적으로 분석할 수 있으며, 절단된 모델을 익스포트할 수 있습니다. 클립퍼 이력을 저장해 이전 버전과 비교할 수도 있습니다.

![클립퍼](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754625226/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2025-08-08_12-53-18_vzedt4.png)

### 대시보드

센서 최적화 결과를 시각화한 대시보드를 제공합니다. 주요 지표와 그래프를 한 화면에서 확인해 빠르게 의사결정할 수 있고, 분석 인사이트가 이해를 돕고, PDF와 CSV로 내보낼 수 있습니다.

![대시보드](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754555365/5-3.png)

### 도면 편집

3D 모델에 Transform(변환)을 적용해 모델을 쉽게 수정·편집할 수 있습니다. 데이터베이스에 저장된 3D 모델을 불러와 새로운 모델을 생성하고, 빠른 액션 버튼으로 여러 기능을 즉시 실행하며, 사용자가 보유한 3D 모델 파일도 추가로 불러올 수 있습니다.

![도면 편집](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754555353/4-1.png)

## 기능별 데모

**워크플로우** — 노드 기반 워크플로우를 구성하고 실행하는 화면

![워크플로우 데모](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754621161/123_yyljl7.gif)

**컨투어** — 가스 농도 컨투어 맵으로 위험 구역을 시각화

![컨투어 데모](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754534421/5.gif)

**클리핑** — 3D 모델을 절단해 내부 구조를 확인하는 클리핑 기능

![클리핑 데모](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754555726/7-1.gif)

**도면 편집** — 트랙볼 등 입력 장치를 이용한 오브젝트 변환 및 추가·삭제

![도면 편집 데모](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754555727/7-2.gif)

**가스 클라우드** — 가스 확산 데이터를 클라우드 형태로 시각화

![가스 클라우드 데모](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754624662/123_gec0gw.gif)

**대시보드** — 케이스별 2가지 포뮬레이션 기반 분석 결과 확인

![대시보드 데모](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754629043/123_mdbw3b.gif)

## 아키텍처

외부 라이브러리(VTK, Chama, NumPy, Pandas) 위에 3개의 레이어로 구성됩니다.

| 레이어                | 역할                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| **사용자 인터페이스** | `main.py` 애플리케이션 진입점, `WorkFlowWindow` 좌측 패널 제어, `VisualizationWindow` 3D 뷰어      |
| **워크플로우 엔진**   | `WorkFlowScene` 워크플로우 시각화, `NodeConnectionManager` 연결 관리, 위젯 간 실시간 데이터 동기화 |
| **위젯**              | 데이터 처리 위젯 5개와 시각화 위젯 3개. 공통 베이스 위젯을 기반으로 한 모듈화된 기능               |

데이터는 도면에서 시각화까지 흐릅니다. 도면 위젯이 후보 감지기 위치를 만들고, 이 위치와 누출 시나리오가 확산 모델 위젯으로 들어갑니다. 확산 데이터는 다시 최적화 위젯과 컨투어·커버리지·가스 클라우드 시각화 위젯으로 전달됩니다.

## 맡은 역할

- 위젯 워크플로우 엔진 설계 및 위젯 시스템 구축
- VTK 기반 3D 시각화(컨투어, 클리핑, 가스 클라우드) 구현
- Chama 활용 센서 배치 최적화 설계 및 구현
- 전체 시스템의 사용자 경험(UX)과 인터페이스(UI) 설계

워크플로우 설계부터 3D 렌더링, 최적화, 배포까지 전 과정을 직접 설계하고 구현했습니다.
