---
title: "DAS3D: 3D Gas Leak Simulation & Sensor Placement Optimization"
pubDatetime: 2025-10-31T09:00:00+09:00
period:
  start: 2023-08
  end: 2025-10
company: Herss Co., Ltd.
category: projects
tags:
  - python
  - pyside6
  - vtk
  - cfd
  - chama
description: A desktop tool that visualizes 3D gas dispersion and finds the best gas detector placement, built around a node-based workflow.
mainImage: https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754533823/1123.png
ogImage: https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754533823/1123.png
---

DAS3D is a 3D, CFD-simulation-based sensor placement optimization system, built to prevent gas leak accidents in industrial facilities before they happen. It loads a 3D drawing of a facility, works with gas dispersion simulation data, and derives the detector layout that makes safety management as effective as possible.

- **Period**: 2023.08 – 2025.10
- **Organization**: Herss Co., Ltd. (Ministry of Environment R&D)
- **Role**: Software developer
- **Stack**: `Python 3.10`, `PySide6 (Qt)`, `VTK`, `Chama`, `OpenFOAM`, `NumPy`, `Pandas`, `MongoDB`

![DAS3D overview](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754533823/1123.png)

## Goals

- Run gas dispersion simulations based on a 3D drawing
- Derive the optimal sensor placement to maximize the efficiency of safety management
- Build a VTK-based platform for visualizing the whole workflow

## Demo

<video controls preload="metadata" style="width:100%" poster="https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754533823/1123.png" src="https://res.cloudinary.com/dvnfrjqcr/video/upload/v1756966057/1%EB%B6%84%EC%86%8C%EA%B0%9C%EC%98%81%EC%83%81_bmwytt.mp4"></video>

The video walks through:

1. Loading and visualizing a 3D model
2. Generating a sensor grid
3. Importing dispersion data
4. Optimizing sensor placement and visualizing the placement coordinates
5. Gas cloud and contour visualization

## Key features

### Workflow

Complex analysis pipelines are composed visually with a node-based workflow. Each widget runs independently and the data flow can be traced on screen, which keeps an analysis readable. Nodes can be freely added, connected and edited, and the workflow engine manages the data flow between widgets and automatically passes results on to the visualization widgets.

![Workflow](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754553881/1-3.png)

### 3D model visualization

High-performance VTK rendering shows the complex structure of an industrial facility intuitively. You can zoom and rotate to inspect the model from any angle, rescale and rotate it to fit the project's reference, and every UI action is reflected in the render window immediately.

![3D model visualization](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754554450/2-2.png)

### Sensor placement optimization

Sensor placement is optimized with the Chama library. It secures maximum coverage with the fewest sensors by considering detection range and environment, proposes an optimal layout automatically from the simulation results, and optimizes several cases at once with asynchronous parallel processing.

![Sensor placement optimization](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754620354/6%EC%B8%B52_c5pqvd.png)

### Gas cloud

3D dispersion results are shown as a translucent cloud, so the extent and concentration of the gas, and therefore the dangerous zones, are visible at a glance. Changes over time can be played back as an animation for accident scenario analysis, for one selected scenario or for all of them.

![Gas cloud](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754624654/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2025-08-08_12-43-51_ndpxmm.png)

### Contour

Gas concentration is drawn as contour maps that mark dangerous zones clearly. Color bands separate concentration levels, distributions can be analyzed on a plane or cross-section to compare risk between areas of the facility, and multi-layer contour maps show how the situation changes over time.

![Contour](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754555354/4-3.png)

### Clipper

Parts of the 3D model can be clipped away to inspect its inside. Cutting off the exterior makes internal equipment and piping easy to see, complex structures can be exposed step by step, and the clipped model can be exported. The clipper history is saved so it can be compared with earlier versions.

![Clipper](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754625226/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2025-08-08_12-53-18_vzedt4.png)

### Dashboard

Sensor optimization results are summarized in a dashboard. Key metrics and charts are on a single screen for quick decisions, analysis insights help interpret them, and the results can be exported as PDF or CSV.

![Dashboard](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754555365/5-3.png)

### Drawing editing

Transforms can be applied to edit 3D models. Models stored in the database can be loaded to create new ones, quick action buttons run common operations immediately, and your own 3D model files can be loaded as well.

![Drawing editing](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754555353/4-1.png)

## Feature demos

**Workflow** — composing and running a node-based workflow

![Workflow demo](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754621161/123_yyljl7.gif)

**Contour** — visualizing dangerous zones with gas concentration contour maps

![Contour demo](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754534421/5.gif)

**Clipping** — cutting the 3D model to inspect its internal structure

![Clipping demo](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754555726/7-1.gif)

**Drawing editing** — transforming, adding and deleting objects with input devices such as a trackball

![Drawing editing demo](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754555727/7-2.gif)

**Gas cloud** — visualizing dispersion data as a gas cloud

![Gas cloud demo](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754624662/123_gec0gw.gif)

**Dashboard** — reviewing analysis results based on two formulations per case

![Dashboard demo](https://res.cloudinary.com/dvnfrjqcr/image/upload/v1754629043/123_mdbw3b.gif)

## Architecture

The application is split into three layers, on top of external libraries (VTK, Chama, NumPy, Pandas).

| Layer               | Responsibility                                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **User interface**  | `main.py` as the entry point, `WorkFlowWindow` for the left control panel, `VisualizationWindow` for the 3D viewer                       |
| **Workflow engine** | `WorkFlowScene` renders the workflow, `NodeConnectionManager` manages connections, and data is synchronized between widgets in real time |
| **Widgets**         | Five data-processing widgets and three visualization widgets, all modular and built on shared base widgets                               |

Data flows from the drawing to the visualizations: the blueprint feeds the candidate detector positions, which feed the dispersion model together with the leak scenarios. The dispersion data then goes to the optimizer and to the contour, coverage and gas cloud visualization widgets.

## What I worked on

- Designed the widget workflow engine and built the widget system
- Implemented the VTK-based 3D visualization: contour, clipping and gas cloud
- Designed and implemented the sensor placement optimization with Chama
- Designed the user experience and interface of the whole system

I took the project from workflow design through 3D rendering and optimization to deployment.
