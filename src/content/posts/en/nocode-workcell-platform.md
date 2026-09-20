---
title: "No-Code Workcell Virtual Commissioning & Control Platform"
pubDatetime: 2025-10-01T09:00:00+09:00
period:
  start: 2025-10
company: Codeflex Co., Ltd.
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
description: A government-funded No-Code manufacturing R&D project. I built two web toolchains that link PLC logic with robot models, and three QML desktop apps that configure and monitor a workcell.
mainImage: https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927568/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B81_bhzdpf.png
ogImage: https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927568/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B81_bhzdpf.png
---

In manufacturing, the data formats of mechanical design (CAD), control design (PLC) and plant operation don't match, so every design change means moving the data over by hand. This project is part of the **No-Code Manufacturing Innovation Ecosystem program** (equipment control / robotics – PLC-based equipment control track). Its goal is a **round-trip engineering (RTE)** workflow built on a workcell digital twin, where **design → simulation → operation → back to design** runs as a loop.

- **Period**: 2025.10 – present
- **Company**: Codeflex Co., Ltd. (government-funded R&D)
- **Role**: Software Developer
- **Tech stack**: `Python`, `PySide6 (Qt/QML)`, `QtQuick3D`, `OPC UA`, `WebSocket`, `MySQL`, `Next.js`, `NestJS`, `Gemini`, `Three.js`, `PLCopen XML`, `URDF`

![main](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927568/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B81_bhzdpf.png)

## Goals

- Convert PLC logic (ST/FB) to a standard format (PLCopen XML) and connect it automatically to the joints of a robot model (URDF)
- Turn results verified in the digital twin back into runnable PLC code (reverse generation)
- Let people without PLC programming knowledge configure and monitor a workcell through a No-Code UI

## Overview

I worked on two different tracks within the same project.

| Track | Project | What it does |
|-------|---------|--------------|
| Web | **PLCStudio** (`plc-app`) | Screens for PLC conversion, mapping, simulation sequence generation and PLC reverse generation (Next.js) |
| Web | **plc-app-backend** | Parser, Gemini integration, deterministic code generation and validation API (NestJS) |
| Desktop | **AgentBuilder** | Design-time tool for configuring the virtual workcell and data services (PySide6/QML) |
| Desktop | **WorkcellAgent** | Runtime app that monitors the configured workcell in real time (PySide6/QML) |
| Desktop | **FIStudio** | Tool for the OPC UA server/client and the tag linker (PySide6/QML) [Check: how to describe its role] |

<!-- 📷 2. Overview diagram: how the 2 web services (pipeline) and the 3 QML apps (design → connect → monitor) fit together -->

## Web-based services

The web side implements a four-step pipeline that links PLC code with robot models. Each step picks up the result of the previous one.

1. **Convert** — turn PLC source (ST etc.) into IEC 61131-3 PLCopen XML
2. **AI Mapping** — analyze PLC + URDF (+ an operating scenario) with Gemini to produce a mapping between joints/actuators and PLC variables
3. **AI Sim Program** — build a digital-twin motion sequence from the mapping and replay it in a 3D viewer
4. **PLC Gen** — reverse-generate PLC ST code from the mapping and sequence (Siemens SCL / Mitsubishi ST) and compare it with the original as a round trip

<div class="img-row" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:16px 0">
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925042/%EC%9B%B91_c6a16j.png" alt="PLCStudio 1" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925043/%EC%9B%B92_pxk3wu.png" alt="PLCStudio 2" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925043/%EC%9B%B93_omef26.png" alt="PLCStudio 3" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
</div>

### Design notes

- **AI infers, code is deterministic**: Gemini produces the mapping and sequence, but the actual PLC code is generated deterministically from per-equipment rules and checked in two stages. This keeps the final code stable even when the AI output is slightly off.
- **Mapping repair**: missing PLC variables are filled in by a separate repair step, and a truncated JSON response is retried up to three times.
- **Two-way verification**: the original ST → mapping → sequence → reverse-generated ST is compared against the original again to see exactly what changed.
- **Joint space / Cartesian (TCP)** profiles are detected automatically, so the mapping fits the type of robot.

## Standalone QML apps

These are used directly on the shop floor, so I built them as desktop apps rather than web apps. All three share the same QML structure (MVVM, multiple languages, themes).

### Separating UI and logic

All three apps use **QML for the screens and Python for the logic**. Mixing widgets and logic in PySide6 alone gets tangled as screens grow, so I wanted to separate the layers the way a layered web architecture does.

| Layer | Role | Web equivalent |
|-------|------|----------------|
| QML View | Draws the screen, forwards user input | Frontend components |
| ViewModel (Python) | Exposes screen state, handles user actions | Controller / store |
| Service (Python) | The real logic: OPC UA, DB, URDF parsing, etc. | Service / domain layer |

The Python side knows nothing about the screen; it only exposes state through `Property` and `Signal`. (The example below is a new, simplified sketch that shows the structure — it is not code from the actual project.)

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
        self._running = not self._running   # a Service call in real code
        self.runningChanged.emit()
```

QML only binds to that state and holds no logic of its own.

```qml
import pyobjects 1.0

StatusViewModel { id: vm }

Button {
    text: vm.running ? "Stop" : "Start"
    onClicked: vm.toggle()
}
```

This way the screens can change freely in QML, and the logic can be tested in Python without any UI.

### AgentBuilder — design time

- **Virtual workcell configuration**: loads a URDF in QtQuick3D, moves the joints, and positions the end effector with inverse kinematics (IK).
- **Data service generation**: builds WDF/WPF/Link definitions into DSF XML and hands them to the workcell monitoring side.

<div class="img-row" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:16px 0">
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925043/%EB%B9%8C%EB%8D%941_gfljzc.png" alt="AgentBuilder 1" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925043/%EB%B9%8C%EB%8D%942_yz5ted.png" alt="AgentBuilder 2" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925042/%EB%B9%8C%EB%8D%943_qtwmbt.png" alt="AgentBuilder 3" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
</div>

### WorkcellAgent — runtime monitoring

- Receives equipment data over OPC UA and WebSocket and reflects it in a **live 3D digital twin**.
- Shows **KPI dashboards such as OEE and throughput** from data stored in MySQL.
- I supported the **TKC GS (Good Software) certification** for this app, and wrote the user manual and installation guide and linked them so they open inside the app.

<div class="img-row" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:16px 0">
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927568/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B81_bhzdpf.gif" alt="WorkcellAgent 1" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927553/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B82_esgihg.png" alt="WorkcellAgent 2" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789927553/%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B83_luhiiq.png" alt="WorkcellAgent 3" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
</div>

### FIStudio

- Supports the OPC UA server/client, **tag linker editing** and NodeSet generation. [Check: actual purpose and users]

<div class="img-row" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin:16px 0">
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925043/%ED%8C%A9%ED%86%A0%EB%A6%AC1_emmxd6.gif" alt="FIStudio 1" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925044/%ED%8C%A9%ED%86%A0%EB%A6%AC2_awiwmy.png" alt="FIStudio 2" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
  <img src="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1789925044/%ED%8C%A9%ED%86%A0%EB%A6%AC3_ctcyfn.png" alt="FIStudio 3" style="margin:0;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px" />
</div>

