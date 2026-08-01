## Aakash Saxena

I am a Lead Engineer in the GenAI, ITC team at Evalueserve, where I build and ship generative AI systems to production — end-to-end delivery of models, tooling, and the evaluation that has to sit underneath them. My background is in research: I hold a Ph.D. in Information Analytics from the University of Colorado Boulder (2020), advised by Prof. Jintae Lee, where I worked on extracting context-sensitive semantics from word-embedding spaces.

The through-line across both halves of my career is a single question: **what meaning do these models actually encode, and how do we measure it rather than assume it?** During my doctorate I asked this of word embeddings. At D.A.T.A., Inc. (January 2022 – July 2024) I asked it of transformer representations, running R&D to operationalize deception detection concepts using NLP. I now ask it of large language models in production.

### Research interests

- **Interpretability of language models** — how semantics are represented internally, and how representations differ across languages
- **Context-sensitive semantics** — measuring how a concept's meaning shifts with the corpus and context it is embedded in
- **Measurement from text** — text mining methods that recover real-world perceptions, judgements, and social phenomena from language
- **Technical AI safety and responsible deployment** — evaluation, failure analysis, and what breaks between benchmark and production

I am happy to talk about any of these. The fastest way to reach me is **aakash.s.07@outlook.com**.

### Dissertation (D)

**Title:** A Method to Extract Context-Sensitive Semantics of a Concept Using Word-Embedding Space and Its Application — [full text](https://search.proquest.com/openview/4befd1d62e7d29a2f4149a816720beea/1?pq-origsite=gscholar&cbl=44156)

**Committee:** Prof. Jintae Lee (Advisor), Prof. David Hekman, Prof. Kai Larsen, Prof. James Martin, Prof. Young Jin Lee

I developed a semi-supervised method that defines concepts as word sets, contextualizes a corpus through corpus refinement, builds a word-embedding space from the refined corpus, and extracts the context-sensitive semantics of a concept from that space. The method recovers real-world perceptions embedded in natural language; I demonstrated one application by measuring perceptions associated with gender and social roles.

The work was organized into theory-driven (**T**) and application-driven (**A**) threads. These labels are referenced throughout the news timeline below.

#### Theory driven (T)

_Completed_

Quest: What are pragmatic/thematic categories that exist in Hotel Reviews? (with Jintae Lee)

- **T**1. Text mining thematic categories for evaluative judgement: A test in the domain of hotel reviews and ratings.

Quest: What are pragmatic/thematic categories? What is the relation between the attributes of such categories and frame elements of a semantic frame? (with Jintae Lee)

- **T**2. A method that uses the word embedding space to capture pragmatic categories, i.e., categories defined by sharing pragmatic contexts such as of evaluating leaders or products. _(Invited for oral presentation in INFORMS Annual Meeting 2019)_

Quest: Can we capture a semantic view of a social phenomenon such as stereotyping or judgements using word embeddings? (with Jintae Lee)

- **T**3. Perceived Leader-Gender Role-Congruity: A text-mining tool to measure the degree of congruence between leader-role and gender-role perceptions in the business context. _(Poster acceptance in International Conference on Computational Social Science 2019)_

#### Application driven (A)

Quest: What are some polarity cues in news articles?

- **A**1. Comparison of opinions in embedding spaces trained on subjective and objective corpora.

Quest: How to tackle deception in news leading to dis- or misinformation?

- **A**2. Demystifying perceptions in online news articles: A possible path to identifying news content susceptible to deception.

Quest: What are the features in authors' vocabulary that can be captured by word embeddings?

- **A**3. An authorship attribution method to identify features to classify fiction-based authors' texts using word embeddings. _(Poster acceptance in INFORMS Business Analytics 2019 Conference)_

### Selected work

- _[Tokenization and its production problem — an interactive visualizer](/2026/03/14/jargon-tokenization-visualizer.html)_ — why domain jargon fragments under standard tokenizers, and what that costs downstream
- _[Evaluation metrics for keyphrase extraction](https://aakashs07.github.io/2023/03/17/Evaluation-metrics-for-keyphrase-extraction.html)_ — a working list of metrics and what each one actually rewards
- _[Prompting ChatGPT on deception](https://deceptionandtruthanalysis.com/insights/f/chatgpt-and-deception-part-1)_ — an early probe of LLM behaviour on deception cues, as part of D.A.T.A., Inc.
- _[Capturing authors' linguistic style](https://nbviewer.org/github/aakashs07/nlp_projects/blob/master/kaggle_spooky_author_identification.ipynb)_ — Kaggle competition notebook
- _[Error analysis of the Naïve Bayes algorithm](https://nbviewer.org/github/aakashs07/nlp_projects/blob/master/Twitter_sentiment_analysis_nb1_using_naive_bayes.ipynb)_ — where the independence assumption breaks, and how it shows up in the confusion matrix

### News about my research efforts

#### 2026

_March_

- 14th: Published a long-pending article on tokenization and its production problem — 👉 [Interactive Visualizer](/2026/03/14/jargon-tokenization-visualizer.html)
- 11th: Promoted to Lead Engineer in Evalueserve's GenAI, ITC team.

#### 2024

_December_

- 2nd: Started at Evalueserve as Senior Engineer, NLP — the next step toward releasing features in production at larger scale than in my previous role.

_August_

- 14th: Practiced implementing the [trie data structure](https://github.com/aakashs07/nlp_projects/blob/master/trei_ds_prac).

_May_

- 3rd: Internally presented an ML-based deception detection model, identifying features relevant to both deceptiveness and truthfulness.

_February_

- 23rd: Presented "Semantics of Darkness: A Text-Based Analysis" in the final round of the Wharton People Analytics White Paper Competition.
- 16th: Selected as a top-five finalist in the Wharton People Analytics White Paper Competition.

#### 2023

_November_

- 8th: "Towards the Semantics of Darkness" accepted for a panel presentation at DeceptiCon 2023. The idea uses semantic features extracted from pretrained deep architectures such as BERT to separate dark triad behaviours from non-dark triad ones.

_March_

- 28th: Prompt engineering demonstration — my interaction (as part of D.A.T.A., Inc.) with ChatGPT on deception, [here](https://deceptionandtruthanalysis.com/insights/f/chatgpt-and-deception-part-1).
- 17th: Added a set of evaluation metrics for the keyphrase extraction task, [here](https://aakashs07.github.io/2023/03/17/Evaluation-metrics-for-keyphrase-extraction.html).
- 3rd: Submitted an abstract, "Towards Context-Sensitive Semantics of Linguistic Cues for Deception," to [IC2S2 2023](https://www.ic2s2.org).

#### 2022

Over the year, I shipped several NLP projects into the company's core products, working across text classification, document classification, language detection, and keyphrase extraction. I also became an active participant in the Deception Research Society.

#### 2021

I spent the year revisiting deep learning fundamentals through coursework and building out a portfolio of NLP projects — one example [here](https://github.com/aakashs07/nlp_projects/blob/master/Twitter_sentiment_analysis_nb1_using_naive_bayes.ipynb). Andrew Ng's courses were a considerable resource; his work democratizing AI deserves the credit it gets.

At Sykes Enterprises I applied that work directly: keyword extraction, fine-tuning BERT for agent-customer call-type prediction, and experiments with toxicity classification and face detection in TensorFlow.js.

_December_

- Left Sitel Group. The role gave me exposure to AI problems at corporate scale — data labelling with the Philippines team, topic modeling over customer support interactions, and a keyword extraction tool developed and deployed on Microsoft Azure. Toward the end of my tenure I oversaw data science modeling services for a major UK-based client.
- 10th: Accepted an offer from Deception And Truth Analysis (_[D.A.T.A.](https://deceptionandtruthanalysis.com/)_). My interest in fake news, misinformation, and deception started during my Ph.D., and this role let me work on it directly.

_June_

- Sykes Enterprises, Inc. was acquired by Sitel Group.

#### 2020

_September_

- Started working at Sykes Enterprises, Inc.

_August_

- Graduated! Thank you all for your support.

_May_

- **D**. Passed my final defense.

_January_

- Working towards my dissertation.

#### 2019

_December_

- **D**. Proposal defense.

_October_

- **T**2. Presented at the INFORMS Annual Meeting 2019, Seattle.

_August_

- Organization Leadership and Information Analytics Fellowship Funding.

_June_

- **T**2. Oral presentation acceptance at the _[INFORMS Annual Meeting](http://meetings2.informs.org/wordpress/seattle2019/)_, October 2019.
- **D**. Presented preliminary dissertation results in my [department](https://www.colorado.edu/business/phd/organizational-behavior-and-information-systems)'s _Summer Research Seminar Series_.

_May_

- **T**2. Invited to present at the _[INFORMS Annual Meeting](http://meetings2.informs.org/wordpress/seattle2019/)_, October 2019.

_April_

- Attended the _[Wharton People Analytics Conference](https://wpa.wharton.upenn.edu/conference/)_ in Philadelphia, PA.

_March_

- **A**3. Poster acceptance at the _[INFORMS Business Analytics 2019 Conference](http://meetings2.informs.org/wordpress/analytics2019/)_.
- **T**3. Poster acceptance at the _[IC2S2 2019 Conference](https://2019.ic2s2.org/)_.

### Outside research

#### 2022

_October_

- 15th: Finished reading _Numbers Don't Lie_.

_May_

- 20th: Visited VERSA in Downtown Denver and got interested in NFTs — [blog post](https://aakashs07.github.io/2022/05/20/Future-of-Art.html).

#### 2021

Trained for and ran my first two 5Ks. First was the [Colfax 5k](https://www.runcolfax.org/races/race-results/) in October (26:04, overall rank 76). Second was the [ColderBoulder 5k](https://www.bolderboulder.com/colder-overall-race-results/) in December, where I took 1:29 off that time (24:35, 86/1389 in race #14, 362/2332 overall).

The interesting part was the physiology. Carbon dioxide lowers blood pH, which triggers the reaction that detaches oxygen from hemoglobin so it can reach the rest of the body — so deep breaths at regular intervals matter for keeping the two gases balanced. Getting that balance wrong mid-run is what produces the fatigue and dizziness.
