---
title: "No-Code 워크셀 가상 커미셔닝 및 제어 통합 플랫폼"
pubDatetime: 2025-10-01T09:00:00+09:00
period:
  start: 2025-10
company: (주)코드플렉스
category: projects
tags:
  - python
  - pyside6
  - qml
  - nextjs
  - nestjs
  - digital-twin
  - plc
  - opcua
description: 정부 지원 No-Code 제조기술혁신 과제로, PLC 로직과 로봇 모델을 연결하는 웹 툴체인 2종과 워크셀을 구성하고 모니터링하는 QML 데스크톱 앱 3종을 개발했습니다.
mainImage: https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927568/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B81_bhzdpf.png
ogImage: https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927568/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B81_bhzdpf.png
---

제조 현장에서는 기구 설계(CAD), 제어 설계(PLC), 공정 운영의 데이터 포맷이 서로 달라, 설계가 바뀔 때마다 사람이 손으로 다시 옮겨 적어야 합니다. 이 프로젝트는 **No-Code 제조기술혁신 생태계 구축 사업**(설비제어/로봇 – PLC 이용 설비제어 분야)의 일환으로, 워크셀 디지털 트윈을 기반으로 **설계 → 시뮬레이션 → 운영 → 다시 설계**가 순환하는 **라운드트립 엔지니어링(RTE)** 체계를 만드는 과제입니다.

- **기간**: 2025.10 – 진행 중
- **소속**: (주)코드플렉스 (정부 지원 R&D)
- **역할**: 소프트웨어 개발자
- **기술 스택**: `Python`, `PySide6 (Qt/QML)`, `QtQuick3D`, `OPC UA`, `WebSocket`, `MySQL`, `Next.js`, `NestJS`, `Gemini`, `Three.js`, `PLCopen XML`, `URDF`

![대표 이미지](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927568/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B81_bhzdpf.png)

## 목표

- PLC 로직(ST/FB)을 표준 포맷(PLCopen XML)으로 바꾸고, 로봇 모델(URDF)의 관절과 자동으로 연결한다
- 디지털 트윈에서 검증한 결과를 다시 실행 가능한 PLC 코드로 되돌린다(역생성)
- PLC 프로그래밍 지식이 없어도 워크셀을 구성하고 모니터링할 수 있는 No-Code UI를 제공한다

## 전체 구성

같은 과제 안에서 성격이 다른 두 갈래를 맡았습니다.

| 구분 | 프로젝트 | 하는 일 |
|------|----------|---------|
| 웹 | **PLCStudio** (`plc-app`) | PLC 변환·매핑·시뮬레이션 시퀀스 생성·PLC 역생성 화면 (Next.js) |
| 웹 | **plc-app-backend** | 파서, Gemini 연동, 결정론 코드 생성·검증 API (NestJS) |
| 데스크톱 | **AgentBuilder** | 가상 워크셀과 데이터 서비스를 구성하는 설계 시점 도구 (PySide6/QML) |
| 데스크톱 | **WorkcellAgent** | 구성된 워크셀을 실시간으로 모니터링하는 런타임 앱 (PySide6/QML) |
| 데스크톱 | **FIStudio** | OPC UA 서버/클라이언트와 태그 링커를 다루는 도구 (PySide6/QML) [확인: 역할 표현] |

<!-- 📷 2. 전체 구성도: 웹 2종(파이프라인)과 QML 3종(설계 → 연결 → 모니터링)이 어떻게 이어지는지 그린 다이어그램 -->

## 웹 기반 서비스

PLC 코드와 로봇 모델을 잇는 4단계 파이프라인을 웹으로 구현했습니다. 각 단계는 앞 단계의 결과를 이어받습니다.

1. **Convert** — PLC 소스(ST 등)를 IEC 61131-3 PLCopen XML로 변환
2. **AI Mapping** — PLC + URDF(+ 운전 시나리오)를 Gemini로 분석해 관절·액추에이터와 PLC 변수의 매핑을 생성
3. **AI Sim Program** — 매핑 결과로 디지털 트윈용 동작 시퀀스를 만들고 3D 뷰어에서 재생
4. **PLC Gen** — 매핑과 시퀀스로 PLC ST 코드를 역생성(Siemens SCL / Mitsubishi ST), 원본과 라운드트립 비교

<div class="img-row" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:16px 0">
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925042/%EC%9B%B91_c6a16j.png" alt="PLCStudio 1" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925043/%EC%9B%B92_pxk3wu.png" alt="PLCStudio 2" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925043/%EC%9B%B93_omef26.png" alt="PLCStudio 3" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
</div>

### 설계 포인트

- **AI는 추론, 코드는 결정론**: 매핑·시퀀스는 Gemini가 만들지만, 실제 PLC 코드는 장비별 규칙으로 결정론적으로 생성하고 2단계로 검증합니다. AI 결과가 조금 틀려도 최종 코드가 흔들리지 않도록 하기 위함입니다.
- **매핑 보정**: 누락된 PLC 변수는 별도 repair 단계에서 채우고, 응답 JSON이 잘리면 최대 3회 재시도합니다.
- **양방향 검증**: 원본 ST → 매핑 → 시퀀스 → 역생성 ST를 다시 원본과 비교해 어디가 달라졌는지 확인합니다.
- **관절 공간 / 직교 좌표(TCP)** 두 프로필을 자동으로 판별해 로봇 종류에 맞는 매핑을 만듭니다.

## QML 기반 스탠드얼론 앱

현장에서 바로 쓰는 앱이라 웹이 아닌 데스크톱으로 만들었고, 세 앱이 같은 QML 구조(MVVM, 다국어, 테마)를 공유합니다.

### UI와 로직의 분리

세 앱 모두 **화면은 QML, 로직은 Python**으로 나눴습니다. PySide6만으로 위젯과 로직을 한데 섞어 쓰면 화면이 커질수록 코드가 엉키기 때문에, 웹의 레이어드 아키텍처처럼 계층을 분리하고 싶었습니다.

| 계층 | 역할 | 웹에서의 대응 |
|------|------|---------------|
| QML View | 화면 그리기, 사용자 입력 전달 | 프론트엔드 컴포넌트 |
| ViewModel (Python) | 화면 상태 노출, 사용자 동작 처리 | 컨트롤러 / 스토어 |
| Service (Python) | OPC UA, DB, URDF 파싱 등 실제 로직 | 서비스 / 도메인 계층 |

Python 쪽은 화면을 전혀 모르고, 상태를 `Property`와 `Signal`로 내놓기만 합니다. (아래는 구조를 보여주기 위해 새로 만든 단순화 예시이며, 실제 프로젝트 코드가 아닙니다.)

```python
# viewmodels/status_viewmodel.py
from PySide6.QtCore import QObject, Property, Signal, Slot
from PySide6.QtQml import QmlElement

QML_IMPORT_NAME = "pyobjects"
QML_IMPORT_MAJOR_VERSION = 1


@QmlElement
class StatusViewModel(QObject):
    runningChanged = Signal()

    def __init__(self):
        super().__init__()
        self._running = False

    @Property(bool, notify=runningChanged)
    def running(self):
        return self._running

    @Slot()
    def toggle(self):
        self._running = not self._running   # 실제로는 Service를 호출
        self.runningChanged.emit()
```

QML은 이 상태에 바인딩만 하고, 로직은 전혀 갖지 않습니다.

```qml
import pyobjects 1.0

StatusViewModel { id: vm }

Button {
    text: vm.running ? "Stop" : "Start"
    onClicked: vm.toggle()
}
```

이렇게 나누면 화면은 QML에서 자유롭게 바꾸고, 로직은 Python에서 화면 없이 따로 테스트할 수 있습니다.

### AgentBuilder — 설계 시점

- **가상 워크셀 구성**: URDF를 QtQuick3D로 불러와 관절을 움직이고, 역기구학(IK)으로 끝단 위치를 맞춥니다.
- **데이터 서비스 생성**: WDF/WPF/Link 정의를 DSF XML로 만들어 워크셀 모니터링 쪽에 넘깁니다.

<div class="img-row" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:16px 0">
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925043/%EB%B9%8C%EB%8D%941_gfljzc.png" alt="AgentBuilder 1" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925043/%EB%B9%8C%EB%8D%942_yz5ted.png" alt="AgentBuilder 2" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925042/%EB%B9%8C%EB%8D%943_qtwmbt.png" alt="AgentBuilder 3" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
</div>

### WorkcellAgent — 런타임 모니터링

- OPC UA·WebSocket으로 설비 데이터를 받아 **실시간 3D 디지털 트윈**에 반영합니다.
- MySQL에 쌓은 데이터로 **OEE, 처리량 등 KPI 대시보드**를 보여줍니다.
- 이 앱은 **TKC GS(Good Software) 인증** 심사를 지원했고, 사용자 매뉴얼·설치 가이드를 작성해 앱 안에서 바로 열 수 있게 연동했습니다.

<div class="img-row" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:16px 0">
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927568/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B81_bhzdpf.gif" alt="WorkcellAgent 1" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927553/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B82_esgihg.png" alt="WorkcellAgent 2" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927553/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B83_luhiiq.png" alt="WorkcellAgent 3" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
</div>

### FIStudio

- OPC UA 서버/클라이언트와 **태그 링커(Linker) 편집**, NodeSet 생성을 지원합니다. [확인: 실제 용도·사용자]

<div class="img-row" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:16px 0">
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925043/%ED%8C%A9%ED%86%A0%EB%A6%AC1_emmxd6.gif" alt="FIStudio 1" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925044/%ED%8C%A9%ED%86%A0%EB%A6%AC2_awiwmy.png" alt="FIStudio 2" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925044/%ED%8C%A9%ED%86%A0%EB%A6%AC3_ctcyfn.png" alt="FIStudio 3" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
</div>

