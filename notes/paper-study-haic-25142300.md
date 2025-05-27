---
title: ChatCollab: Exploring Collaboration Between Humans and AI Agents in Software Teams
tags:
  - paper
emoji: >
modified: 2025-05-14
---

# ChatCollab: Exploring Collaboration Between Humans and AI Agents in Software Teams

## 1. Abstract
(주제) 여러 인간과 AI 에이전트가 동료로서 함께 작업할 수 있도록 하는 일반적인 프레임워크를 제시하고 초기 테스트를 수행하여 인간과 인공지능(AI) 간의 생산적인 팀 기반 협업 가능성을 탐구합니다.
(방법/실험모델) ChatCollab의 새로운 아키텍처는 에이전트(인간 또는 AI)가 모든 역할로 협업에 참여하고, Slack 내에서 자율적으로 작업 및 커뮤니케이션에 참여하며, 협력자 인간인지 AI인지에 관계없이 구애받지 않도록 합니다.
(결과/시사점) 소프트웨어 엔지니어링을 사례 연구로 사용하여, 우리의 AI 에이전트가 자신의 역할과 책임을 성공적으로 식별하고, 다른 에이전트와 협력하며, 진행하기 전에 요청된 입력 또는 결과물을 기다린다는 것을 발견했습니다.
소프트웨어 개발을 위한 세 가지 이전의 멀티 에이전트 AI 시스템과 관련하여, 우리는 ChatCollab AI 에이전트가 인터랙티브 게임 개발 작업에서 유사하거나 더 나은 소프트웨어를 생산한다는 것을 발견했습니다.
또한 우리는 에이전트의 행동 특성을 효과적으로 식별하는 협업 역학 분석을 위한 자동화된 방법을 제안하며, 이를 통해 다양한 실험 조건에서 협업 역학을 정량적으로 비교할 수 있습니다.
예를 들어, ChatCollab AI 에이전트를 비교할 때, AI 최고경영자(CEO) 에이전트가 일반적으로 AI 제품 관리자 또는 AI 개발자보다 2-4배 더 자주 제안을 제공하여 ChatCollab 내의 에이전트가 차별화된 협업 역할을 의미 있게 채택할 수 있음을 시사합니다.
## 2. Citation
Benjamin Klieger, et al., Stanford University
arXiv:2412.01992v1 [cs.HC] 2 Dec 2024
https://doi.org/10.48550/arXiv.2412.01992
Submitted on 2 Dec 2024
## 3. Background
대규모 언어 모델(LLMs)과 인공지능(AI) 에이전트 시스템의 발전으로 인간과 AI 간의 생산적인 협업 가능이 크게 높아졌습니다.
- AI-Assisted Software Development
	- GitHub Copilot, Tabnine, Replit Ghostwriter, Codeium과 같은 소프트웨어 개발 AI 도구가 널리 사용되고 있습니다.
- Multi-AI-Agent Software Development
	- LLM이 복잡한 프로그램 생성과 같은 계층적 다단계 추론 작업에 어려움을 겪을 수 있다고 관찰합니다 [22]. 이러한 제한 사항을 관찰한 Zelikman et al. [43]은 알고리즘 작업을 계층적 자연어 함수 설명으로 자동 분해한 다음 각 함수에 적합한 코드 구현을 선택하는 프레임워크를 소개합니다.
- Human interaction with AI agents for Learning
	- 여러 명의 인간이 여러 AI 에이전트와 동료로서 상호 작용하여 작업 결과물을 생성하는 멀티 에이전트 시스템에 대한 연구가 많지 않습니다.
	- Biswas et al.은 가르칠 수 있는 에이전트, 멘토 에이전트, 학생 에이전트 및 환경 에이전트의 네 가지 에이전트를 포함하는 멀티 에이전트 아키텍처를 갖춘 학습 시스템을 제안합니다.
(차별점) 그러나 널리 사용되는 코파일럿은 인간을 주요 의사 결정 역할에 배치하고 일반적으로 인간 대 인간 상호 작용의 역학을 변경하지 않습니다.
지금까지 인간-AI 협업에 대한 대부분의 이전 연구(예: [ 16 , 17, 23, 24, 28, 33 , 34, 41, 44, 47])는 주로 협력 게임 [47], 객체 식별 [46] 또는 의사 결정 [33]과 같은 1:1 상호 작용이나 정량적으로 측정 가능한 작업에 초점을 맞추었습니다.
최근에는 소프트웨어 개발 또는 유사한 작업을 완료하기 위해 여러 AI 에이전트를 조정하는 새로운 종류의 AI 에이전트 시스템 [2– 4 , 36]이 등장했습니다. 그러나 앞으로 우리는 리 인간과 **AI** 에이전트 모두로 구성된 보다 유연하게 구조화된 협업 팀이 더욱 두드러져 인간과 AI 에이전트 모두 필요에 따라 다양한 역할을 수행할 수 있을 것이라고 믿습니다.
(제안) 인간과 AI 간의 생산적인 팀 기반 협업을 위한 광범위한 잠재력을 탐구하기 위해 우리는 AI 에이전트가 인간과 동료 협력자로서 지원하는 구성 가능한 실험 시스템인 ChatCollab을 제시합니다.
## 4. Methodology
- 소프트웨어 개발에 사용되는 인간-AI 협업 팀을 위한 구성 가능한 시스템인 ChatCollab을 구현하였습니다.
![[Pasted image 20250514153000.png]]
![[Pasted image 20250514153054.png]]
- AI 에이전트가 다양한 역할을 구현하고 협업 행동을 통해 특정 사회적 지식을 입증하도록 유도하는 효과를 측정하기 위한 협업 분석 방법을 소개합니다.
- 소프트웨어 개발을 위해 설계된 세 가지 이전 다중-AI-에이전트 시스템인 MetaGPT, ChatDev 및 SuperAGI [2 – 4]에 의해 생산된 소프트웨어의 특징을 서로 비교하고 사례 연구에서 ChatCollab과 비교합니다.
- 협업 분석을 수행하기 위해 잘 확립된 Bales’ IPA(Interaction Process Analysis Framework) Framework[10 ]를 사용하였습니다.
	- Bales’ IPA는 소규모 그룹의 상호작용을 분석하는 데 사용되는 잘 알려진 방법입니다. 본 논문에서는 LLM을 사용하여 에이전트 행동을 자동으로 분류하고 분석하기 위해 이 프레임워크를 활용했습니다.
- 프레임워크의 각 범주는 다음과 같습니다.
	Shows Solidarity (연대감 표시): 다른 사람의 지위를 높여주고, 도움을 주거나 보상을 제공합니다.
	Shows Tension Release (긴장 완화 표시): 농담을 하거나, 웃거나, 만족감을 표현합니다.
	Agrees (동의): 수동적인 수용을 보이거나, 이해하고, 동의하며, 따릅니다.
	Gives Suggestion (제안): 다른 사람에게 자율성을 부여하는 방향을 제시합니다.
	Gives Opinion (의견 제시): 평가, 분석, 감정 또는 바람을 표현합니다.
	Gives Orientation (정보 제공): 정보, 반복, 명확화, 확인을 제공합니다.
	Asks for Orientation (정보 요청): 정보, 반복, 확인을 요청합니다.
	Asks for Opinion (의견 요청): 평가, 분석, 감정 표현을 요청합니다.
	Asks for Suggestion (제안 요청): 방향, 가능한 행동 방식을 요청합니다.
	Disagrees (반대): 수동적인 거부, 형식적인 태도를 보이거나 도움을 보류합니다.
	Shows Tension (긴장 표시): 도움을 요청하거나 대화에서 이탈합니다.
	Shows Antagonism (적대감 표시): 다른 사람의 지위를 깎아내리거나 자신을 방어하거나 주장합니다.
- **Collaborative Configurability**
	- (사회 과학에서 말하는 조절 변수(moderator)로써의 의미일 것으로 생각됨)
	- 인간-AI 에이전트 팀 내 협업이 특정 상호 작용 행동을 제안하는 프롬프트를 통해 의미 있게 유도될 수 있는 정도를 분석합니다.
	- 각 실험 조건을 대조군과 비교하여 프롬프트가 협업 패턴에 미치는 영향을 이해하기 위해 상호 작용 범주에서 백분율 차이를 분석했습니다.
(차별점) 이 논문에서는 ChatCollab 에이전트의 상호작용을 Bales' IPA 프레임워크에 따라 분류함으로써, 각 에이전트의 역할에 따른 행동 패턴과 프롬프트 변경이 상호작용에 미치는 영향을 분석했습니다.
(LLM을 사용하여 이러한 질적 코딩을 자동화하는 방식은 전통적인 사회 과학 연구 방법과 최신 AI 기술을 결합한 흥미로운 접근 방식입니다.)

(참고) 실험 결과
![[Pasted image 20250514164505.png]]
![[Pasted image 20250514164433.png]]
## 5. Discussion
- **Limitations**
	- Limited Collaboration Analysis
	- Limited Code Quality Analysis
	- Biases of AI
	- Significant Computational Expenses
	- AI Agents Don’t Know Who is a Human
	- Dependence on LLMs:
- **Future work**
	- 이 시스템이 더 넓은 맥락에 어떻게 적용될 수 있는지, 그리고 인간에 미치는 영향을 조사하기 위한 인간 사용자 연구를 포함하여 하이브리드 팀 내에서 생산성 및 상호 작용의 질을 연구하는 데 어떻게 사용될 수 있는지 연구하고자 합니다.
	- 모든 가능한 실험 또는 응용 프로그램에 대해 ChatCollab을 활용하도록 초대합니다. 소스 코드와 데이터는 GitHub [5]에서 공개적으로 사용할 수 있습니다.
