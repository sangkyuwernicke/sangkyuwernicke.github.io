---
title: 2026년 5~7월 트레이딩 AI 에이전트 최신 연구 서베이
tags:
  - paper
emoji: >
modified: 2026-07-22
---

http://sangkyuwernicke.github.io/survey202607.html

# 트레이딩 AI 에이전트 서베이: 2026년 5~7월 최신 연구 동향

**작성일:** 2026-07-22
**범위:** 2026-05-01 ~ 2026-07-31 arXiv 프리프린트
**본문 인용 논문 수:** 31편 (전량 arXiv API 배치 검증으로 CONFIRMED)
**환각 검증 결과:** 0건 (검증 원장: `_workspace/03_verification/verdicts.md`)

---

## 요약 (Executive Summary)

본 서베이는 2026년 5월~7월 사이 arXiv에 공개된 트레이딩 AI 에이전트 관련 프리프린트 **31편**을 대상으로 한다. 이 기간의 연구는 크게 세 가지 축으로 수렴한다.

첫째, **LLM 기반 트레이딩 에이전트가 "무엇을 아는가"와 "무엇을 실제로 벌 수 있는가" 사이의 간극을 정면으로 다루기 시작했다.** 다수 연구가 실행 가정·시간 게이트·거래 비용의 비일관성을 재현성 위기의 핵심 원인으로 지목하며 [Yao & Zheng, 2026-06, "Beyond Agent Architecture", https://arxiv.org/abs/2606.08285], [Ghosh & Devarakonda, 2026-06, "FinBench", https://arxiv.org/abs/2607.16229], [Zhu et al., 2026-05, "From Knowing to Doing", https://arxiv.org/abs/2605.28359] 신뢰-역량 간극(confidence-competence gap)과 메모리 마스킹 실험을 통해 LLM이 종종 시장·스타일 노출을 알파로 오인함을 보인다.

둘째, **RL 기반 포트폴리오 최적화는 위험 민감·분포 인식·레짐 적응이라는 세 방향으로 세련화되고 있다.** 물리학 기반 RL(HJB) [Halperin & Itkin, 2026-07, "SciPhy RL", https://arxiv.org/abs/2607.15195], 자유에너지-엔트로피 이중성 [Lleo & Runggaldier, 2026-06, "RL for Risk-Sensitive Investment Management", https://arxiv.org/abs/2606.20903], HMM+RL 레짐 배분 [Verma et al., 2026-05, "Regime-Based Portfolio Allocation", https://arxiv.org/abs/2605.27848]이 대표적이다.

셋째, **멀티에이전트 LLM 시스템의 조정(coordination) 그 자체가 병목으로 인식되기 시작했다.** 생산 환경 실패율이 41~87%로 보고되며 [Nechepurenko & Shuvalov, 2026-05, "Coordination as an Architectural Layer", https://arxiv.org/abs/2605.03310], Shapley 크레딧 할당 [Pei et al., 2026-05, "Market Regime Council", https://arxiv.org/abs/2605.24490]·심의 루프 [Letteri, 2026-05, "AgenticAITA", https://arxiv.org/abs/2605.12532] 같은 조정 계층이 별도 설계 대상으로 부상했다.

미해결 과제는 재현 가능한 평가 프로토콜, 룩어헤드 바이어스 제거, 그리고 학습된 정책의 시장 조작 리스크 [Tsaknaki et al., 2026-07, "Can RL Efficiently Discover Price Manipulation?", https://arxiv.org/abs/2607.06121] 관리로 정리된다.

---

## 1. 서론 — 트레이딩 AI 에이전트란

**트레이딩 AI 에이전트**는 시장 데이터·뉴스·거시경제 신호·주문서 상태 등을 입력으로 받아, 자산 배분·매매 신호·주문 실행을 자율적으로 산출하는 학습 기반 시스템을 총칭한다. 본 서베이가 다루는 범위는 다음 다섯 개 부문의 교집합이다.

1. **LLM 트레이딩**: 대규모 언어 모델을 의사결정·리서치·조정 계층으로 활용
2. **RL 트레이딩**: 강화학습으로 정책·배분·실행을 최적화
3. **포트폴리오 최적화**: 위험·수익 관계를 학습해 자산 배분을 동적으로 산출
4. **시장 예측**: 시계열·감성·거시 데이터로 가격·방향·변동성 예측
5. **멀티에이전트 트레이딩**: 전문화된 다수 에이전트의 협력·심의로 의사결정

**왜 지금 중요한가.** 2025년 하반기부터 파운데이션 모델의 도구 사용·긴 컨텍스트·구조화 출력 능력이 실용 트레이딩 파이프라인에 이식 가능한 수준에 도달했고, 동시에 오프-폴리시 RL과 분포 인식 최적화가 성숙하면서 두 계열이 처음으로 정면 충돌·상호 보완하는 지점을 형성했다. 이 서베이는 그 첫 3개월(2026-05~07) 문헌을 지도화한다.

---

## 2. 조사 방법과 커버리지

### 2.1 검색 전략

- **소스:** arXiv (`q-fin.*`, `cs.LG`, `cs.AI`, `cs.MA`) 중심. 관련 도메인 확장어(`LLM trading`, `deep reinforcement learning portfolio`, `multi-agent LLM finance`, `market regime`, `limit order book`, `execution optimal`, `sentiment finance`) 클러스터로 발굴.
- **기간 필터:** 2026-05-01 ~ 2026-07-31 제출 기준(arXiv ID YYMM 코드 2605~2607, 일부 2607 처리 논문 중 원 제출일이 6월 말인 케이스 포함).
- **파이프라인:** paper-scout(동의어 확장 검색) → paper-analyst(논문별 분석) → **citation-verifier(arXiv API 배치 조회로 실존·저자·날짜 대조)** → survey-synthesizer(본 리포트).

### 2.2 확인 규모 및 검증 결과

| 지표 | 수치 |
|------|------|
| 총 발굴 후보 | 39편 (범위 내 31 + 배경 8) |
| **CONFIRMED (본문 인용)** | **31편** |
| OUT-OF-RANGE (부록 A) | 8편 (2026-04 이전) |
| REJECTED / UNVERIFIED | 0편 / 0편 |
| 검증 방법 | arXiv API `id_list` 배치 4회 + 제목·저자·날짜 대조 |

검증 원장은 `_workspace/03_verification/verdicts.md`에 보관되며, 모든 인용은 arXiv 링크로 추적 가능하다.

### 2.3 커버리지 한계 (정직하게)

- **arXiv 편중.** 컨퍼런스 프로시딩(NeurIPS 2026·ICML 2026 워크샵 등)과 SSRN·업계 프리프린트(예: 헤지펀드 리서치 노트)는 본 서베이 범위 외이다. 이 편향은 실증 수익률 보고 관행보다 방법론 논문에 무게가 실리게 만든다.
- **3개월 스냅샷.** 이전 3~6개월 흐름(2025-11~2026-04)은 부록 A의 배경 8편으로만 맥락 보강한다. 장기 트렌드 추론은 신중을 요한다.
- **수치 신뢰도.** 논문 초록에서 발췌한 수익률·샤프 값 중 일부는 원문 전체를 검증하지 못했다(예: [Guo, 2026-07, "Learning Predictive Ambiguity Sets", https://arxiv.org/abs/2607.09820]의 26.28% 연간 수익·샤프 1.30은 초록 인용치로, 정확 재현은 원문 대조를 요한다). 본문에서는 해당 각주를 명시한다.
- **재현 검증 불가.** 본 서베이는 각 논문의 코드·데이터를 재실행하지 않았다. 성능 주장은 저자 보고치이며, 실제 산업 배포 성능은 별도 실증이 필요하다.

---

## 3. 택소노미 — 연구 지형

31편의 CONFIRMED 논문을 실제 방법·목표에서 귀납적으로 7개 그룹으로 분류한다. 그룹 간 경계에 걸친 논문은 주 그룹에 배치하되 관련 그룹에서 교차 인용한다.

| 그룹 | 편수 | 초점 |
|-----|------|------|
| [A] LLM 기반 트레이딩 에이전트 | 7 | LLM을 리서치·의사결정 코어로 사용, 재현성·매크로 사전·반사성 |
| [B] RL 트레이딩 / 포트폴리오 최적화 | 8 | 심층 RL·물리학 기반 RL·레짐 적응 배분 |
| [C] 멀티에이전트 트레이딩 | 3 | 조정 계층·크레딧 할당·심의 루프 |
| [D] 주문 실행 AI | 2 | Implementation shortfall·AMM 수수료 실행 |
| [E] 시장 예측 / 감성 분석 | 6 | 시퀀스 모델·감성 앙상블·멀티모달·매크로 어텐션 |
| [F] 평가 / 백테스팅 프레임워크 | 4 | 시간 게이트·합성 스트레스·PIT RAG·LOB 지연 |
| [G] 리스크 관리 | 1 | RL의 시장 조작 발견 가능성 |

숫자에서 보이듯 **LLM(7) + RL/포트폴리오(8) = 15편**이 서베이의 절반을 차지한다. 나머지 절반은 조정·실행·예측·평가·리스크로 세분화된 인프라·안전 계층이다. 이 분포는 "핵심 결정 엔진(LLM/RL)은 성숙, 주변 계층은 아직 조각화" 상태를 시사한다.

---

## 4. 논문별 상세 분석

### [A] LLM 기반 트레이딩 에이전트

#### A1. AI Trading: Evaluating LLMs for Technical Market Analysis
- **저자·날짜:** Geofrey Ntale, 2026-07-16
- **링크:** https://arxiv.org/abs/2607.15414
- **핵심 기여:** 5개 최신 LLM을 기술적 분석 태스크에서 체계적으로 평가.
- **방법:** 기술적 지표 해석·차트 패턴 인식·매매 신호 산출 태스크로 벤치마크.
- **결과:** 모든 모델에서 지속적 실패 모드 발견. 특히 **수치 환각(numeric hallucination)**이 공통 결함으로 보고됨.
- **한계:** 단일 저자 벤치마크로 태스크 범위가 제한적이며, 실제 거래 환경 실행은 다루지 않음.

#### A2. Beyond Agent Architecture: Execution Assumptions and Reproducibility in LLM-Based Trading Systems
- **저자·날짜:** Junyi Yao, Zihao Zheng, 2026-06-06
- **링크:** https://arxiv.org/abs/2606.08285
- **핵심 기여:** LLM 트레이딩 연구 30편을 감사해 재현성 위기를 계량화.
- **방법:** 실행 타이밍·거래 비용 모델링·평가 프로토콜 3축으로 비일관성 코딩.
- **결과:** 대부분 논문이 실행 지연·슬리피지·수수료를 부분적으로만 명세. 동일 아이디어라도 실행 가정을 바꾸면 결과가 뒤집힘.
- **한계:** 감사 대상이 arXiv 프리프린트에 편중. 폐쇄 소스 산업 시스템은 제외.

#### A3. Macro Economists in the Machine: Multi-Agent LLM Framework for Commodity ETF Portfolio
- **저자·날짜:** Yiqing Wang et al., 2026-06-06
- **링크:** https://arxiv.org/abs/2606.08283
- **핵심 기여:** 대조적 매크로 사전(hawkish/dovish)을 부여한 LLM 에이전트들을 심의(debate)시켜 원자재 ETF 배분.
- **방법:** 각 에이전트는 특정 거시 관점을 초기 프롬프트로 주입받고 토론 후 합의 배분 산출.
- **결과:** 금리 사이클 전체(완화·정상·긴축)에서 결정론적 규칙 기반 대비 우수한 위험 조정 수익.
- **한계:** 원자재 ETF 유니버스로 국한. 심의 프로토콜의 LLM 의존성(모델 교체 시 재현) 불명확.

#### A4. From Knowing to Doing: A Memory-Controlled Benchmark for LLM Trading Agents
- **저자·날짜:** Taojie Zhu et al., 2026-05-27
- **링크:** https://arxiv.org/abs/2605.28359
- **핵심 기여:** **KTD-Fin 벤치마크** — 시장 메모리를 마스킹해 "알파 대 시장/스타일 노출" 분리 실험.
- **방법:** LLM 에이전트가 사전 학습으로 흡수한 과거 시장 지식을 마스킹한 상태에서 트레이딩 성과 측정.
- **결과:** 상당수 에이전트의 수익이 사실상 **수동적 시장/스타일 노출**로 설명됨. 진정한 신호 생성 능력은 제한적.
- **한계:** 마스킹 완전성 검증이 어려움. LLM 내부 지식의 완전한 제거는 근사적일 수밖에 없음.

#### A5. MadEvolve: Evolutionary Optimization of Trading Systems with LLMs
- **저자·날짜:** Yurii Kvasiuk et al., 2026-05-21
- **링크:** https://arxiv.org/abs/2605.23007
- **핵심 기여:** LLM을 진화 알고리즘의 변이·교배 오퍼레이터로 사용해 Bitcoin 트레이딩 전략과 피처 엔지니어링을 공동 최적화.
- **방법:** LLM이 코드 형태로 전략 후보를 생성·변형하고 백테스트 성과를 적합도로 사용.
- **결과:** 성능 개선 보고와 함께 **p-hacking 리스크**를 저자 스스로 평가·경고.
- **한계:** 단일 자산(BTC) 최적화로 다자산 일반화 미검증.

#### A6. Reflexivity as Prompt: LLM Financial Market Forecasters
- **저자·날짜:** Eugene Park, 2026-05-19
- **링크:** https://arxiv.org/abs/2606.00061
- **핵심 기여:** 조지 소로스의 **반사성(reflexivity) 이론**을 프롬프트로 주입해 붐-버스트 사이클 예측 정확도 변화 측정.
- **방법:** 동일 시장 데이터에 반사성 프롬프트 유무 조건 A/B 비교.
- **결과:** 정확도 변화가 모델별로 상이. 특정 모델에서만 유의 개선.
- **한계:** 반사성 개념의 조작적 정의가 프롬프트 문구에 의존. 이론 충실도 검증이 어려움.

#### A7. Augmenting Fundamental Analysis with LLMs: RAG-Based Investor Briefs
- **저자·날짜:** Bartosz Ziółko, Kacper Dobrzeniecki, 2026-07-10
- **링크:** https://arxiv.org/abs/2607.09121
- **핵심 기여:** RAG 강화 LLM으로 기업 보고서·SEC 파일링을 분석해 투자자 브리핑 자동 생성.
- **방법:** 문서 청킹·임베딩·검색 후 구조화된 브리핑 템플릿으로 합성.
- **결과:** 애널리스트 수작업 대비 처리 시간 대폭 단축 및 커버리지 확대.
- **한계:** 브리핑 품질의 정성 평가에 그쳐, 투자 성과와의 인과 링크는 미검증.

---

### [B] RL 트레이딩 / 포트폴리오 최적화

#### B1. AlphaZeroBeta: Deep RL for Market-Neutral Portfolios
- **저자·날짜:** Boris Belyakov, 2026-07-20
- **링크:** https://arxiv.org/abs/2607.18001
- **핵심 기여:** CNN-GRU 정책과 Recurrent PPO 결합으로 시장 중립(alpha-only) 초과 수익 추구.
- **방법:** 롱-숏 배분을 시장 베타 제로 제약 하에서 정책 그래디언트로 학습.
- **결과:** 시장 방향과 독립적인 초과 수익 프로파일 보고.
- **한계:** 실거래 시 롱-숏 페어 청산 비용·차입 비용의 완전 모델링 여부 확인 필요.

#### B2. SciPhy RL for Portfolio Optimization
- **저자·날짜:** Igor Halperin, Andrey Itkin, 2026-07-16
- **링크:** https://arxiv.org/abs/2607.15195
- **핵심 기여:** **물리학 기반 RL**로 Hamilton-Jacobi-Bellman(HJB) 방정식을 결합한 오프라인 포트폴리오 학습.
- **방법:** 오프라인 역사 데이터에서 **분포 인식(distribution-aware) 정책**을 학습, 실시간 재학습 없이 배분.
- **결과:** 표준 오프-폴리시 RL 대비 분포 이동에 강건.
- **한계:** HJB 근사 정확도가 상태 공간 차원에 취약. 대규모 유니버스 확장성은 별도 검증 필요.

#### B3. CLQT: Closed-Loop Benchmark for LLM Portfolio-Management Agents
- **저자·날짜:** Bo Qu, Mingguang Chen, 2026-06-29
- **링크:** https://arxiv.org/abs/2606.29771
- **핵심 기여:** LLM 포트폴리오 에이전트를 **평가**하기보다 **진단**하기 위한 6개 기둥 프레임워크 — 시간 게이트·비용 모델링·전략 일관성 등.
- **방법:** 폐루프 시뮬레이터에 시간·비용·거래량 제약을 정확히 명세.
- **결과:** 기존 평가 프로토콜의 다수 결함을 노출. "잘 되는 것처럼 보이는" 에이전트가 진단 하에서 실패.
- **한계:** 벤치마크 자체가 아직 신규로 커뮤니티 채택 여부는 지켜봐야 함.

#### B4. RL for Risk-Sensitive Investment Management: Free Energy-Entropy Duality
- **저자·날짜:** Sebastien Lleo, Wolfgang Runggaldier, 2026-06-18
- **링크:** https://arxiv.org/abs/2606.20903
- **핵심 기여:** **자유 에너지-엔트로피 이중성**으로 연속 시간 위험 민감 자산 배분 문제를 재정식화.
- **방법:** 지수 효용 최적화를 엔트로피 정규화 RL로 표현.
- **결과:** 위험 민감도(θ)가 자연스럽게 엔트로피 온도로 매핑되어 하이퍼파라미터 해석성 확보.
- **한계:** 이론 논문 성격이 강하며 대규모 실증은 후속 과제.

#### B5. Dynamic Multi-Pair Trading DRL for Cryptocurrency
- **저자·날짜:** Damian Lebiedź, Robert Ślepaczuk, 2026-06-03
- **링크:** https://arxiv.org/abs/2606.04574
- **핵심 기여:** PPO+LSTM으로 결정론적 위험 경계 하 암호화폐 통계적 차익거래.
- **방법:** 다중 페어 스프레드를 상태로, 청산 신호를 액션으로 학습. 부트스트랩 검증 수행.
- **결과:** **10% 유의 수준**에서 통계적으로 유의미한 초과 수익.
- **한계:** 암호화폐 특유의 유동성·거래소 신뢰성·자금조달 수수료의 완전 반영은 후속 과제.

#### B6. ReCAP: Regime-Adaptive Continual Learning for Portfolio Management
- **저자·날짜:** Chaofan Pan et al., 2026-05-29
- **링크:** https://arxiv.org/abs/2606.00143
- **핵심 기여:** **적응적 레짐 감지 모듈**로 시장 데이터를 자동 세분화하는 지속 학습 포트폴리오.
- **방법:** 온라인 변화 감지 + 레짐별 서브모델 라우팅.
- **결과:** 정적 학습 대비 레짐 전환 구간에서 견고성 향상.
- **한계:** 레짐 수·감지 임계값 등 하이퍼파라미터가 성능에 민감.

#### B7. Regime-Based Portfolio Allocation: HMM + RL
- **저자·날짜:** Ajay Kumar Verma et al., 2026-05-27
- **링크:** https://arxiv.org/abs/2605.27848
- **핵심 기여:** **HMM 레짐 감지 + RL 동적 배분** 파이프라인.
- **방법:** HMM으로 잠재 레짐 추론 → 레짐 조건부 RL 정책이 배분 결정.
- **결과:** 순수 HMM·순수 RL·평균-분산 기준 대비 **RL 정책이 가장 높은 위험 조정 성과**.
- **한계:** HMM 상태 수 선택의 사전 의존성. 레짐 라벨링의 사후 해석에 유의.

#### B8. DRL Diversified Portfolio Across Global Equity Markets
- **저자·날짜:** Kamil Kashif, Robert Ślepaczuk, 2026-05-17
- **링크:** https://arxiv.org/abs/2605.17307
- **핵심 기여:** SAC(Soft Actor-Critic)를 글로벌 주식 배분에 적용, 지역 시장별 성과 비교.
- **방법:** 다지역 주가지수·환율을 상태로 결합한 SAC 정책.
- **결과:** **Euro Stoxx 50**에서 벤치마크 대비 경쟁력 있는 성과. 다른 지역에서는 혼재된 결과.
- **한계:** 지역별 성과 격차의 원인(유동성·정보 효율성) 분석 부재.

---

### [C] 멀티에이전트 트레이딩

#### C1. Market Regime Council: Multi-Agent LLM + Shapley Credit Assignment
- **저자·날짜:** Yunhua Pei et al., 2026-05-23
- **링크:** https://arxiv.org/abs/2605.24490
- **핵심 기여:** 지수 가중 성과 이력 기반 **Shapley 값 크레딧 할당**으로 멀티에이전트 LLM에 동적 가중치.
- **방법:** 각 에이전트를 특정 시장 레짐 전문가로 학습, Shapley 근사로 개별 기여도 산정 후 앙상블.
- **결과:** 균등 가중·다수결 대비 위험 조정 수익 개선.
- **한계:** Shapley 근사 계산 비용이 에이전트 수에 지수적으로 증가.

#### C2. AgenticAITA: Deliberative Multi-Agent Reasoning for Autonomous Trading
- **저자·날짜:** Ivan Letteri, 2026-05-01
- **링크:** https://arxiv.org/abs/2605.12532
- **핵심 기여:** 신호-실행 이분 패러다임을 **자율 심의 루프(deliberative reasoning loop)**로 대체.
- **방법:** 전문 에이전트(매크로·기술·리스크·실행)들이 자율 협의를 통해 최종 주문 산출.
- **결과:** **5일 검증에서 157회 호출, 마찰률 11.5%** 보고.
- **한계:** POC 수준의 짧은 관측 창. 장기·다양한 시장 조건에서의 강건성 검증 필요.

#### C3. Coordination as an Architectural Layer for LLM Multi-Agent Systems
- **저자·날짜:** Maksym Nechepurenko, Pavel Shuvalov, 2026-05-05
- **링크:** https://arxiv.org/abs/2605.03310
- **핵심 기여:** 다중 에이전트 LLM 시스템의 **생산 실패율이 41~87%**임을 실증하며 조정을 독립 아키텍처 층으로 분리 제안.
- **방법:** 5가지 조정 구성(파이프라인·투표·계층·시장·심의)의 실패 유형·복구율 비교.
- **결과:** 조정 층을 명시적으로 설계하지 않으면 개별 에이전트 품질 개선이 무의미해질 수 있음.
- **한계:** 실패 정의(무응답·모순·타임아웃)의 조작적 기준이 배포 환경 의존적.

---

### [D] 주문 실행 AI

#### D1. TT-DAC-PS: Twin-Target Deterministic Actor-Critic for Optimal Trade Execution
- **저자·날짜:** Ilia Zaznov et al., 2026-06-07
- **링크:** https://arxiv.org/abs/2606.08379
- **핵심 기여:** 대규모 주식 매도 실행 최적화를 위한 **트윈-타겟 결정론적 액터-크리틱** + 정책 스무딩.
- **방법:** Almgren-Chriss 계열 프레임을 확장한 RL 실행 정책.
- **결과:** **Implementation shortfall**을 다양한 시장 조건에서 일관 감소.
- **한계:** 시장 충격 모델의 파라미터 추정이 여전히 사전 캘리브레이션에 의존.

#### D2. RL for Execution under Dynamic Fees in DEX Simulator
- **저자·날짜:** Wen-Ting Wang, 2026-07-12
- **링크:** https://arxiv.org/abs/2607.10960
- **핵심 기여:** AMM 동적 수수료 환경의 **폐루프 시뮬레이터**에서 실행 정책 학습.
- **방법:** DQN·PPO 등 후보 정책을 동일 시뮬레이터에서 비교.
- **결과:** **DQN이 유효 정책 중 유일하게 개선을 입증**한 케이스로 보고.
- **한계:** 시뮬레이터의 슬리피지·수수료 모델이 특정 DEX 구조에 특화.

---

### [E] 시장 예측 / 감성 분석

#### E1. VAIOM: Decoder-Only Financial Sequence Modeling
- **저자·날짜:** Yiming Ma, Xinyu Chen, 2026-07-15
- **링크:** https://arxiv.org/abs/2607.13929
- **핵심 기여:** 외환 바(bar) 단위 확률론적 다음-수익 모델링을 위한 디코더-온리 시퀀스 모델.
- **방법:** 연속 입력·이산 출력 구조로 수익 분포 자체를 예측.
- **결과:** **모든 모델 구성에서 LightGBM 기준선 상회**.
- **한계:** 외환 특정 실험. 주식·크립토 일반화는 후속 과제.

#### E2. Learning Predictive Ambiguity Sets for DRO Portfolio
- **저자·날짜:** Junjie Guo, 2026-07-10
- **링크:** https://arxiv.org/abs/2607.09820
- **핵심 기여:** 문맥 예측을 **분포 강건 최적화(DRO)**의 모호성 집합 학습으로 결합.
- **방법:** 문맥 조건부 확률 밴드를 학습해 DRO에 주입.
- **결과:** **연간 수익 26.28%, 샤프 지수 1.30 보고**¹.
- **한계:** ¹ 초록 인용치로, 정확 재현·기간·백테스트 조건은 원문 대조 필요. 강건성-수익 트레이드오프의 민감도 분석은 후속 과제.

#### E3. CryptoGAT: Graph Attention Network for Crypto Forecasting
- **저자·날짜:** Yu Peng, Matloob Khushi, Josiah Poon, 2026-06-26
- **링크:** https://arxiv.org/abs/2606.27670
- **핵심 기여:** 암호화폐 예측을 **교차자산 네트워크**로 재구성한 그래프 어텐션 모델.
- **방법:** 자산 간 상관·거래량 결합도를 엣지로 삼는 GAT.
- **결과:** 최첨단 시계열 모델을 능가.
- **한계:** 네트워크 정의(엣지 임계값·정규화) 선택의 성능 민감성.

#### E4. Hybrid News Sentiment Engine for Market Analysis
- **저자·날짜:** Andreas Aigner, 2026-06-02
- **링크:** https://arxiv.org/abs/2606.03457
- **핵심 기여:** 렉시콘·TF-IDF·앙상블을 결합한 3중 감성 엔진.
- **방법:** 규칙·통계·학습 신호를 뉴스-가격 페어 데이터로 앙상블 학습.
- **결과:** **CPU 서버에서 1초 미만 처리** — 저지연 인프라 친화.
- **한계:** 감성-수익 인과 링크는 상관관계로 보고, 매매 시뮬레이션은 별도.

#### E5. Multi-modal DL for Stock Price Direction on Earnings Days
- **저자·날짜:** Manuel Noseda, Nathan Soldati, Marco Paina, 2026-05-25
- **링크:** https://arxiv.org/abs/2605.25894
- **핵심 기여:** 기본·기술 지표·FinBERT 감성을 결합한 멀티모달 실적일 방향 예측.
- **방법:** Transformer·CNN·LSTM 비교.
- **결과:** **Transformer가 변동성 움직임 탐지에서 우수**.
- **한계:** 실적일 이벤트 스터디에 국한. 정상 시장일 성능 미보고.

#### E6. Macro-aware Forecasting via Hierarchical Mixed-Frequency Attention (HANET)
- **저자·날짜:** Daniel Cunha Oliveira et al., 2026-05-30
- **링크:** https://arxiv.org/abs/2606.00624
- **핵심 기여:** **혼합 주파수(일·주·월) 매크로 데이터**를 계층적 어텐션으로 통합한 시계열 예측.
- **방법:** 각 주파수를 별도 인코더로 처리 후 계층 어텐션 융합.
- **결과:** **격동 기간(위기·정책 변경)에서 일관 우수**.
- **한계:** 매크로 시리즈 선택·전처리 파이프라인이 도메인 지식 의존.

---

### [F] 평가 / 백테스팅 프레임워크

#### F1. FinBench: Time-Gated Calibration for Agentic Financial Forecasting
- **저자·날짜:** Rishab Ghosh, Vinay Devarakonda, 2026-06-24
- **링크:** https://arxiv.org/abs/2607.16229
- **핵심 기여:** LLM 예측의 **신뢰-역량 간극(confidence-competence gap)**을 엄격 시간 게이트로 노출.
- **방법:** 정확한 시간 컷오프로 룩어헤드 바이어스 차단 후 캘리브레이션 지표 측정.
- **결과:** 다수 LLM이 과잉 확신을 보이며 캘리브레이션 실패.
- **한계:** 벤치마크 태스크 커버리지의 대표성은 확장 검증 필요.

#### F2. Point-in-Time Financial RAG with Market-Feedback
- **저자·날짜:** Zijie Zhao, Roy E. Welsch, 2026-05-29
- **링크:** https://arxiv.org/abs/2605.31201
- **핵심 기여:** LLM 파인튜닝 없이 **시장 피드백으로 검색을 적응 업데이트**하는 PIT-RAG.
- **방법:** 검색 후 성과 신호를 리트리버 스코어로 역전파.
- **결과:** **포트폴리오 샤프가 0.52 → 0.84로 개선**.
- **한계:** 시장 피드백 지연·잡음이 리트리버 수렴에 미치는 영향의 이론 분석 부재.

#### F3. FinStressTS: Parametric Synthetic Benchmark for TS Forecasting
- **저자·날짜:** Jiaze Sun et al., 2026-06-02
- **링크:** https://arxiv.org/abs/2606.03184
- **핵심 기여:** **30개 진단 환경·6가지 메커니즘 패밀리**의 파라메트릭 합성 벤치마크.
- **방법:** 트렌드·계절성·레짐 전환·헤비테일·시프트 등을 파라미터로 생성.
- **결과:** **Transformer 계열이 자기회귀·선형 모델에 패배하는 다수 환경** 존재.
- **한계:** 합성 데이터가 실시장 미시구조 이질성을 온전히 모사하지는 못함.

#### F4. LOB Prediction Latency-Efficient Architecture
- **저자·날짜:** C. Evans Hedges, 2026-06-24
- **링크:** https://arxiv.org/abs/2606.25986
- **핵심 기여:** LOB 예측에서 **추론-계산 프론티어**의 멱법칙 관계 수립 + FastBiNLOB 아키텍처.
- **방법:** 지연·정확도 파레토를 스캔해 목표 지점 초과 달성.
- **결과:** 성능 목표를 초과 달성하는 저지연 아키텍처 제안.
- **한계:** 특정 LOB 데이터셋에서 확립된 스케일링 법칙의 일반성.

---

### [G] 리스크 관리

#### G1. Can RL Efficiently Discover Price Manipulation?
- **저자·날짜:** Ioanna-Yvonni Tsaknaki, Andrea Macrì, Fabrizio Lillo, 2026-07-07
- **링크:** https://arxiv.org/abs/2607.06121
- **핵심 기여:** **모델-프리 RL이 모델 기반 접근보다 조작 전략을 더 효율적으로 발견**함을 보임.
- **방법:** 통제된 시장 시뮬레이터에서 조작(스푸핑·마킹) 전략 발견 효율 비교.
- **결과:** 학습 알고리즘의 **시장 배포 시 이중 용도 위험** 경고. 규제·모니터링 함의 논의.
- **한계:** 시뮬레이터 특이성. 실시장 배포에는 시장 미시구조·규제·상대 대응 모델 추가 필요.

---

## 5. 관통하는 트렌드

### 트렌드 1 — 재현성·평가 위기가 최전선 이슈로

세 편 이상의 논문이 서로 다른 각도에서 같은 문제를 지적한다.

- **실행 가정 감사**로 30편 재현성 결함 계량화 [Yao & Zheng, 2026-06, https://arxiv.org/abs/2606.08285]
- **시간 게이트 캘리브레이션**으로 LLM 과잉 확신 노출 [Ghosh & Devarakonda, 2026-06, https://arxiv.org/abs/2607.16229]
- **파라메트릭 합성 벤치마크**로 모델 순위 뒤집힘 실증 [Sun et al., 2026-06, https://arxiv.org/abs/2606.03184]
- **폐루프 LLM 포트폴리오 진단** 6개 기둥 [Qu & Chen, 2026-06, https://arxiv.org/abs/2606.29771]

공통 메시지: "잘 되는 것처럼 보이는" 시스템의 다수가 시간·비용·룩어헤드를 엄격히 제어하면 성과가 사라진다. 재현성은 부차적 관심사가 아닌 방법론 그 자체의 문제로 취급되기 시작했다.

### 트렌드 2 — LLM은 "지식→행동" 간극이 크다

메모리 마스킹 [Zhu et al., 2026-05, https://arxiv.org/abs/2605.28359]·시간 게이트 [Ghosh & Devarakonda, 2026-06, https://arxiv.org/abs/2607.16229]·기술적 분석 실패 감사 [Ntale, 2026-07, https://arxiv.org/abs/2607.15414]가 세 각도에서 같은 결론에 도달한다: LLM이 보고하는 "판단"은 종종 사전 학습된 시장 지식의 재활용이며, 진정한 신호 생성은 마스킹 시 크게 약화된다. 이는 LLM을 **의사결정 코어보다 리서치·문서 합성 계층**으로 배치하는 것이 현재로선 더 정직한 사용법임을 시사한다 — [Ziółko & Dobrzeniecki, 2026-07, https://arxiv.org/abs/2607.09121] RAG 브리핑이 그 예시.

### 트렌드 3 — 레짐 인식·적응이 핵심 설계 축

레짐 감지는 더 이상 사전처리가 아닌 **정책 아키텍처의 일급 구성 요소**로 통합되고 있다.

- 매크로 사이클별 LLM 심의 [Wang et al., 2026-06, https://arxiv.org/abs/2606.08283]
- 지속 학습 + 적응적 레짐 감지 [Pan et al., 2026-05, https://arxiv.org/abs/2606.00143]
- HMM + RL 레짐 조건부 배분 [Verma et al., 2026-05, https://arxiv.org/abs/2605.27848]
- 시장 레짐 카운슬로 크레딧 할당 [Pei et al., 2026-05, https://arxiv.org/abs/2605.24490]
- 혼합 주파수 매크로 어텐션 [Cunha Oliveira et al., 2026-05, https://arxiv.org/abs/2606.00624]

### 트렌드 4 — 멀티에이전트 조정 그 자체가 병목

- **41~87% 생산 실패율** [Nechepurenko & Shuvalov, 2026-05, https://arxiv.org/abs/2605.03310]
- Shapley 크레딧 할당 [Pei et al., 2026-05, https://arxiv.org/abs/2605.24490]
- 심의 루프 POC(마찰률 11.5%) [Letteri, 2026-05, https://arxiv.org/abs/2605.12532]

개별 에이전트 품질보다 **조정 프로토콜**이 시스템 성과를 좌우한다는 관찰이 세 논문에서 반복된다.

### 트렌드 5 — 위험 민감·분포 인식 RL의 세련화

- 물리학 기반 HJB 결합 [Halperin & Itkin, 2026-07, https://arxiv.org/abs/2607.15195]
- 자유 에너지-엔트로피 이중성 [Lleo & Runggaldier, 2026-06, https://arxiv.org/abs/2606.20903]
- 문맥 예측 결합 DRO [Guo, 2026-07, https://arxiv.org/abs/2607.09820]

세 접근은 서로 독립이지만 공통적으로 **분포 이동·꼬리 위험·불확실성**을 정책 학습의 일차 목표로 삼는다. 표준 기대 수익 최대화 프레임의 시대는 이 서브필드에서는 저물고 있다.

### 트렌드 6 — 시장 미시구조에 특화된 정책 학습

- 대규모 매도 실행 [Zaznov et al., 2026-06, https://arxiv.org/abs/2606.08379]
- AMM 동적 수수료 실행 [Wang, 2026-07, https://arxiv.org/abs/2607.10960]
- LOB 지연-정확도 파레토 [Hedges, 2026-06, https://arxiv.org/abs/2606.25986]
- 외환 바 단위 시퀀스 모델링 [Ma & Chen, 2026-07, https://arxiv.org/abs/2607.13929]

"거래 결정"과 "거래 실행"의 경계가 흐려지며, 정책 자체가 마이크로세컨드 수준의 미시구조 상태를 상태로 흡수하기 시작했다.

### 트렌드 7 — RL의 이중 용도(dual-use) 위험 인식

[Tsaknaki et al., 2026-07, https://arxiv.org/abs/2607.06121]은 단일 논문이지만 필드의 규제·안전 담론에 결정적 신호를 준다: 시장에 학습 알고리즘을 배포한다는 것은 조작 전략을 자동 발견할 수 있는 시스템을 배포한다는 것과 동치일 수 있다. 이는 [Kvasiuk et al., 2026-05, https://arxiv.org/abs/2605.23007]이 자체 지적한 **p-hacking 리스크**와 함께 "학습 시스템의 안전 프로파일" 논의로 확장될 여지가 크다.

---

## 6. 발전 방향과 미해결 과제

CONFIRMED 31편의 "한계" 절과 저자 자성적 서술을 종합하면 다음 다섯 방향이 반복된다.

### 6.1 표준화된 시간 게이트·비용·룩어헤드 프로토콜

여러 감사·진단·벤치마크 논문 [Yao & Zheng, 2026-06, https://arxiv.org/abs/2606.08285], [Qu & Chen, 2026-06, https://arxiv.org/abs/2606.29771], [Ghosh & Devarakonda, 2026-06, https://arxiv.org/abs/2607.16229]이 공통으로 지적하듯 재현 가능한 트레이딩 평가 프로토콜의 커뮤니티 합의가 시급하다. NeurIPS·ICML 등의 트랙 형식으로의 채택이 다음 단계.

### 6.2 LLM 지식 오염(leakage)의 정량 측정 표준

메모리 마스킹 [Zhu et al., 2026-05, https://arxiv.org/abs/2605.28359] 접근은 유망하나 마스킹 완전성 자체가 근사적이다. 사전학습 시점 이후 시장 데이터로 격리된 평가 셋 구축 관행이 필요하다.

### 6.3 조정 프로토콜의 형식화

[Nechepurenko & Shuvalov, 2026-05, https://arxiv.org/abs/2605.03310]이 지적한 41~87% 실패율은 개별 LLM 개선으로 해소되지 않는다. 실패 유형 분류·복구 정책·성공 정의 등을 아키텍처 계층 수준에서 형식화하는 후속 연구가 필요하다.

### 6.4 분포 강건성과 실전 수익의 트레이드오프

위험 민감·DRO 계열 [Halperin & Itkin, 2026-07, https://arxiv.org/abs/2607.15195], [Lleo & Runggaldier, 2026-06, https://arxiv.org/abs/2606.20903], [Guo, 2026-07, https://arxiv.org/abs/2607.09820]은 이론적 강건성을 확보하지만, 보수화가 실전 수익을 얼마나 희생하는지의 표준 지표가 부재하다.

### 6.5 학습 정책의 안전·규제 프레임

[Tsaknaki et al., 2026-07, https://arxiv.org/abs/2607.06121]과 [Kvasiuk et al., 2026-05, https://arxiv.org/abs/2605.23007]이 각각 조작 리스크·p-hacking을 지적한다. **레드팀 프로토콜**·**배포 전 안전 감사**·**시장 감독기관과의 협력 프레임**이 후속 과제.

---

## 7. 결론

2026년 5~7월 트레이딩 AI 에이전트 문헌 31편은 필드가 **낙관적 프로토타이핑 단계에서 방법론적 자기 반성 단계로 이행**하는 국면임을 보여준다. LLM 트레이딩 논문의 상당수가 "얼마나 벌 수 있는가"보다 "무엇을 실제로 알고 있는가"를 묻기 시작했고 [Zhu et al., 2026-05, https://arxiv.org/abs/2605.28359], [Ghosh & Devarakonda, 2026-06, https://arxiv.org/abs/2607.16229], RL 포트폴리오는 위험 민감·분포 인식으로 이론적 세련화가 진행 중이다 [Halperin & Itkin, 2026-07, https://arxiv.org/abs/2607.15195], [Lleo & Runggaldier, 2026-06, https://arxiv.org/abs/2606.20903]. 멀티에이전트 시스템은 조정을 별도 계층으로 인식하기 시작했고 [Nechepurenko & Shuvalov, 2026-05, https://arxiv.org/abs/2605.03310], 실행·미시구조 계층은 정책 학습의 자연스러운 확장 대상으로 통합되고 있다 [Zaznov et al., 2026-06, https://arxiv.org/abs/2606.08379], [Hedges, 2026-06, https://arxiv.org/abs/2606.25986].

정직한 커버리지 한계로서 본 서베이는 arXiv 프리프린트 3개월치·31편 표본에 기반하며 재현 실험을 수행하지 않았다. 인용된 성과 수치는 저자 보고치이므로 실무 채택 시 원문·코드·데이터의 독립 재현이 요구된다. 그럼에도 이 스냅샷은 필드의 **자기 비판적 성숙**과 **안전·규제 담론의 부상**이라는 명확한 방향성을 확인해 준다.

---

## 부록 A: 검증 실패·범위 밖 항목 (투명성)

### A.1 OUT-OF-RANGE — 기간 외 배경 논문 (본문 배제)

아래 8편은 실존은 arXiv API로 확인되었으나 제출일이 서베이 범위(2026-05-01 ~ 2026-07-31) 이전이라 본문 인용에서 제외한다. 트렌드 맥락 참고용으로만 나열한다.

| arXiv ID | 제목(약) | 날짜 |
|---------|---------|------|
| 2604.26747 | From Hypotheses to Factors: Constrained LLM Agents in Crypto (44.55% 연간 수익 out-of-sample) | 2026-04-29 |
| 2604.11477 | OOM-RL: Market-Driven Alignment for LLM Multi-Agent Systems (샤프 2.06) | 2026-04-13 |
| 2604.18602 | Machine Spirits: LLM Agents in Asset Markets (15개 LLM 자산시장 시뮬레이션) | 2026-04-09 |
| 2604.03888 | PolySwarm: Multi-Agent LLM for Prediction Market Trading (50개 LLM 페르소나) | 2026-04-04 |
| 2603.21330 | FinRL-X: AI-Native Modular Infrastructure for Quant Trading | 2026-03-22 |
| 2602.18481 | AlphaForgeBench: LLM Trading Strategy Design Benchmark | 2026-02-10 |
| 2602.23330 | Toward Expert Investment Teams: Multi-Agent LLM | 2026-02-26 |
| 2602.07023 | Behavioral Consistency Validation for LLM Agents | 2026-02-02 |

### A.2 REJECTED / UNVERIFIED

**해당 없음.** citation-verifier 배치 검증에서 REJECTED·UNVERIFIED 판정이 발생하지 않았다. 후보 39편 전량이 arXiv API 조회로 실존·저자·날짜 일치 확인.

---

## 부록 B: 전체 인용 목록 (CONFIRMED 31편)

### [A] LLM 기반 트레이딩 에이전트

1. Geofrey Ntale. "AI Trading: Evaluating Large Language Models for Technical Market Analysis." arXiv:2607.15414, 2026-07-16. https://arxiv.org/abs/2607.15414
2. Junyi Yao, Zihao Zheng. "Beyond Agent Architecture: Execution Assumptions and Reproducibility in LLM-Based Trading Systems." arXiv:2606.08285, 2026-06-06. https://arxiv.org/abs/2606.08285
3. Yiqing Wang et al. "Macro Economists in the Machine: Multi-Agent LLM Framework for Commodity ETF Portfolio." arXiv:2606.08283, 2026-06-06. https://arxiv.org/abs/2606.08283
4. Taojie Zhu et al. "From Knowing to Doing: A Memory-Controlled Benchmark for LLM Trading Agents." arXiv:2605.28359, 2026-05-27. https://arxiv.org/abs/2605.28359
5. Yurii Kvasiuk et al. "MadEvolve: Evolutionary Optimization of Trading Systems with LLMs." arXiv:2605.23007, 2026-05-21. https://arxiv.org/abs/2605.23007
6. Eugene Park. "Reflexivity as Prompt: LLM Financial Market Forecasters." arXiv:2606.00061, 2026-05-19. https://arxiv.org/abs/2606.00061
7. Bartosz Ziółko, Kacper Dobrzeniecki. "Augmenting Fundamental Analysis with LLMs: RAG-Based Investor Briefs." arXiv:2607.09121, 2026-07-10. https://arxiv.org/abs/2607.09121

### [B] RL 트레이딩 / 포트폴리오 최적화

8. Boris Belyakov. "AlphaZeroBeta: Deep RL for Market-Neutral Portfolios." arXiv:2607.18001, 2026-07-20. https://arxiv.org/abs/2607.18001
9. Igor Halperin, Andrey Itkin. "SciPhy Reinforcement Learning for Portfolio Optimization." arXiv:2607.15195, 2026-07-16. https://arxiv.org/abs/2607.15195
10. Bo Qu, Mingguang Chen. "CLQT: A Closed-Loop Benchmark for LLM Portfolio-Management Agents." arXiv:2606.29771, 2026-06-29. https://arxiv.org/abs/2606.29771
11. Sebastien Lleo, Wolfgang Runggaldier. "RL for Risk-Sensitive Investment Management: a Free Energy–Entropy Duality Approach." arXiv:2606.20903, 2026-06-18. https://arxiv.org/abs/2606.20903
12. Damian Lebiedź, Robert Ślepaczuk. "Dynamic Multi-Pair Trading Cryptocurrency via Deep Reinforcement Learning." arXiv:2606.04574, 2026-06-03. https://arxiv.org/abs/2606.04574
13. Chaofan Pan et al. "ReCAP: Regime-Adaptive Continual Learning for Portfolio Management." arXiv:2606.00143, 2026-05-29. https://arxiv.org/abs/2606.00143
14. Ajay Kumar Verma et al. "Regime-Based Portfolio Allocation Using HMM and RL." arXiv:2605.27848, 2026-05-27. https://arxiv.org/abs/2605.27848
15. Kamil Kashif, Robert Ślepaczuk. "Deep RL Framework for Diversified Portfolio Management Across Global Equity Markets." arXiv:2605.17307, 2026-05-17. https://arxiv.org/abs/2605.17307

### [C] 멀티에이전트 트레이딩

16. Yunhua Pei et al. "Market Regime Council for Dynamic Credit Assignment in Multi-Agent LLM Decision Systems." arXiv:2605.24490, 2026-05-23. https://arxiv.org/abs/2605.24490
17. Ivan Letteri. "AgenticAITA: A POC About Deliberative Multi-Agent Reasoning for Autonomous Trading Systems." arXiv:2605.12532, 2026-05-01. https://arxiv.org/abs/2605.12532
18. Maksym Nechepurenko, Pavel Shuvalov. "Coordination as an Architectural Layer for LLM-Based Multi-Agent Systems." arXiv:2605.03310, 2026-05-05. https://arxiv.org/abs/2605.03310

### [D] 주문 실행 AI

19. Ilia Zaznov et al. "TT-DAC-PS: Twin-Target Deterministic Actor-Critic with Policy Smoothing for Optimal Trade Execution." arXiv:2606.08379, 2026-06-07. https://arxiv.org/abs/2606.08379
20. Wen-Ting Wang. "RL for Execution under Dynamic Fees in a Closed-Loop DEX Simulator." arXiv:2607.10960, 2026-07-12. https://arxiv.org/abs/2607.10960

### [E] 시장 예측 / 감성 분석

21. Yiming Ma, Xinyu Chen. "VAIOM: Continuous-Input, Discrete-Output Decoder-Only Financial Sequence Modeling." arXiv:2607.13929, 2026-07-15. https://arxiv.org/abs/2607.13929
22. Junjie Guo. "Learning Predictive Ambiguity Sets for Decision-Focused DRO." arXiv:2607.09820, 2026-07-10. https://arxiv.org/abs/2607.09820
23. Yu Peng, Matloob Khushi, Josiah Poon. "CryptoGAT: Are Time Series Models Effective for Cryptocurrency Forecasting?" arXiv:2606.27670, 2026-06-26. https://arxiv.org/abs/2606.27670
24. Andreas Aigner. "Hybrid News Sentiment Engine: Real-Time Market Analysis via Adaptive Ensemble Learning on News-Price Pairs." arXiv:2606.03457, 2026-06-02. https://arxiv.org/abs/2606.03457
25. Manuel Noseda, Nathan Soldati, Marco Paina. "Predicting Stock Price Direction on Earnings Announcement Days using Multi-modal Deep Learning." arXiv:2605.25894, 2026-05-25. https://arxiv.org/abs/2605.25894
26. Daniel Cunha Oliveira et al. "Macro-aware Time Series Forecasting via Hierarchical Mixed-Frequency Attention Models." arXiv:2606.00624, 2026-05-30. https://arxiv.org/abs/2606.00624

### [F] 평가 / 백테스팅 프레임워크

27. Rishab Ghosh, Vinay Devarakonda. "FinBench: Time-Gated Calibration and Uncertainty Benchmarking for Agentic Financial Forecasting." arXiv:2607.16229, 2026-06-24. https://arxiv.org/abs/2607.16229
28. Zijie Zhao, Roy E. Welsch. "Point-in-Time Financial RAG with Frozen LLMs and Market-Feedback Adaptive Retrieval." arXiv:2605.31201, 2026-05-29. https://arxiv.org/abs/2605.31201
29. Jiaze Sun et al. "FinStressTS: A Parametric Synthetic Benchmark for Time-Series Forecasting in Finance." arXiv:2606.03184, 2026-06-02. https://arxiv.org/abs/2606.03184
30. C. Evans Hedges. "The Inference-Compute Frontier and a Latency-Efficient Architecture for Limit Order Book Prediction." arXiv:2606.25986, 2026-06-24. https://arxiv.org/abs/2606.25986

### [G] 리스크 관리

31. Ioanna-Yvonni Tsaknaki, Andrea Macrì, Fabrizio Lillo. "Can Reinforcement Learning Efficiently Discover Price Manipulation?" arXiv:2607.06121, 2026-07-07. https://arxiv.org/abs/2607.06121

---

**검증 원장:** `_workspace/03_verification/verdicts.md`
**후보 목록:** `_workspace/01_scout/candidates.md`
**종합 노트:** `_workspace/04_synthesis/notes.md`
