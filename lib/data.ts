/** Données statiques du site — aucune base de données requise. */

export type Stat = { id: string; label: string; value: number; suffix: string | null };
export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string | null;
  readTime: number;
  publishedAt: Date;
  featured: boolean;
};
export type Exploration = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  whyPrescribed: string;
  steps: string;
  preparation: string;
  image: string | null;
  icon: string;
};
export type Regime = {
  id: string;
  slug: string;
  title: string;
  pathology: string;
  summary: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  allowed: string;
  forbidden: string;
  tips: string;
  downloadUrl: string | null;
};
export type Question = {
  id: string;
  author: string | null;
  content: string;
  answer: string;
  votes: number;
  createdAt: Date;
};
export type Tip = {
  id: string;
  title: string;
  category: string;
  image: string | null;
  summary: string;
};
export type Survey = {
  id: string;
  question: string;
  options: string;
  correctAnswer: number;
};

export const stats: Stat[] = [
  { id: "s1", label: "Articles publiés", value: 42, suffix: "+" },
  { id: "s2", label: "Patients sensibilisés", value: 1200, suffix: "" },
  { id: "s3", label: "Années d'expérience", value: 18, suffix: "" },
  { id: "s4", label: "Explorations proposées", value: 6, suffix: "" },
];

export const articles: Article[] = [
  {
    id: "a1",
    slug: "alimentation-coeur-mediterraneenne",
    title: "Le régime méditerranéen, allié de votre cœur",
    excerpt:
      "Pourquoi les nutritionnistes et cardiologues recommandent-ils si souvent le régime méditerranéen ? Découvrez les clés d'une alimentation cardioprotectrice.",
    content: `## Qu'est-ce que le régime méditerranéen ?

Le régime méditerranéen n'est pas un régime restrictif. C'est un mode d'alimentation équilibré, riche en fruits, légumes, céréales complètes, légumineuses, noix et huile d'olive, avec une consommation modérée de poisson et de volaille.

## Les bienfaits cardiovasculaires

Plusieurs études ont montré que ce régime peut réduire le risque de maladies cardiovasculaires d'environ 30 %. Il agit en :

- baissant le cholestérol LDL ("mauvais cholestérol") ;
- améliorant la fonction vasculaire ;
- réduisant l'inflammation chronique ;
- favorisant un poids de forme stable.

## Les aliments à privilégier

- Huile d'olive vierge extra (1 à 2 cuillères par jour)
- Fruits à coque non salés (amandes, noix)
- Poisson gras 2 fois par semaine (saumon, sardine, maquereau)
- Légumineuses, légumes de saison, fruits frais
- Céréales complètes et pain complet

## À limiter

- Viandes rouges et charcuteries
- Produits ultra-transformés
- Sucres ajoutés
- Sel (idéalement moins de 5 g par jour)

> **Disclaimer** : Ce contenu est informatif et ne remplace pas un avis médical personnalisé. Consultez votre cardiologue ou un nutritionniste avant toute modification importante de votre alimentation.`,
    category: "alimentation",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    readTime: 6,
    publishedAt: new Date("2026-01-15"),
    featured: true,
  },
  {
    id: "a2",
    slug: "activite-physique-cardiaque",
    title: "Bouger pour son cœur : par où commencer ?",
    excerpt:
      "30 minutes d'activité modérée par jour suffisent à améliorer la santé cardiovasculaire. Voici comment commencer en douceur, même après 60 ans.",
    content: `## Pourquoi l'activité physique protège le cœur ?

L'activité physique régulière renforce le muscle cardiaque, améliore la circulation sanguine, aide à réguler la tension artérielle et favorise le maintien d'un poids santé.

## Quelle intensité choisir ?

La bonne intensité est celle qui vous permet de parler sans être essoufflé. On parle d'activité "modérée" : marche rapide, natation, vélo, jardinage, danse...

## Progression en 3 étapes

1. **Commencer doucement** : 10 minutes de marche par jour pendant une semaine.
2. **Augmenter progressivement** : ajouter 5 minutes chaque semaine.
3. **Se fixer un objectif** : 150 minutes d'activité modérée par semaine, soit 30 minutes par jour, 5 jours sur 7.

## Attention aux signaux d'alerte

Arrêtez immédiatement l'effort et consultez un médecin si vous ressentez :
- une douleur thoracique ;
- un essoufflement anormal ;
- des vertiges ou une impression de malaise.

> **Disclaimer** : Ce contenu est informatif et ne remplace pas une consultation médicale.`,
    category: "activité physique",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
    readTime: 5,
    publishedAt: new Date("2026-02-01"),
    featured: false,
  },
  {
    id: "a3",
    slug: "comprendre-cholesterol",
    title: "Cholestérol : le bon, le mauvais et les triglycérides",
    excerpt:
      "Le cholestérol est essentiel au corps, mais excès de LDL et de triglycérides augmente le risque cardiovasculaire. Explications simples et conseils pratiques.",
    content: `## Le cholestérol, qu'est-ce que c'est ?

Le cholestérol est une substance grasse nécessaire à la fabrication des hormones et des membranes cellulaires. Le problème vient de l'excès, notamment de LDL.

## LDL, HDL, triglycérides : décryptage

- **LDL** : le "mauvais" cholestérol. En excès, il se dépose dans les vaisseaux.
- **HDL** : le "bon" cholestérol. Il aide à éliminer l'excès de cholestérol.
- **Triglycérides** : un autre type de graisse sanguine. Leur excès est aussi nuisible.

## Objectifs recommandés

- LDL < 1,6 g/L si vous avez un facteur de risque cardiovasculaire
- LDL < 1,0 g/L en cas de maladie cardiovasculaire avérée
- HDL > 0,4 g/L chez l'homme, > 0,5 g/L chez la femme
- Triglycérides < 1,5 g/L

## Comment faire baisser le LDL naturellement ?

- Réduire les graisses saturées (viandes rouges, fromages, beurre)
- Privilégier les fibres (légumes, fruits, céréales complètes, légumineuses)
- Consommer des fruits à coque non salés
- Pratiquer une activité physique régulière
- Arrêter de fumer

> **Disclaimer** : Ce contenu est informatif et ne remplace pas un avis médical.`,
    category: "pathologies",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    readTime: 7,
    publishedAt: new Date("2026-02-20"),
    featured: false,
  },
  {
    id: "a4",
    slug: "sommeil-coeur",
    title: "Un sommeil de qualité pour un cœur en forme",
    excerpt:
      "Mauvais sommeil rime souvent avec tension artérielle élevée et inflammation. Voici comment améliorer votre sommeil pour protéger votre cœur.",
    content: `## Le lien entre sommeil et cœur

Un sommeil insuffisant ou de mauvaise qualité est associé à une augmentation du risque d'hypertension, d'infarctus et d'accident vasculaire cérébral.

## Quelques conseils d'hygiène de sommeil

- Levez-vous et couchez-vous à heures fixes, même le week-end.
- Évitez les écrans au moins 1 heure avant le coucher.
- Limitez la caféine après 14 h.
- Faites une activité relaxante le soir : lecture, respiration, musique douce.
- Gardez la chambre fraîche, sombre et silencieuse.

## Quand consulter ?

Si vous ronflez fort, si vous avez des pauses respiratoires pendant le sommeil ou une somnolence diurne excessive, parlez-en à votre médecin. Un apnée du sommeil non traitée augmente le risque cardiovasculaire.

> **Disclaimer** : Ce contenu est informatif et ne remplace pas une consultation médicale.`,
    category: "sommeil",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    readTime: 5,
    publishedAt: new Date("2026-03-05"),
    featured: false,
  },
  {
    id: "a5",
    slug: "stress-et-coeur",
    title: "Gérer le stress au quotidien pour soulager son cœur",
    excerpt:
      "Le stress chronique libère des hormones qui augmentent la tension et le rythme cardiaque. Apprenez à apaiser votre système nerveux au quotidien.",
    content: `## Le stress, un facteur de risque méconnu

Le stress chronique contribue à l'hypertension artérielle, à l'inflammation et aux comportements à risque (tabagisme, alimentation déséquilibrée, sédentarité).

## Techniques simples à intégrer

- **Respiration abdominale** : 5 minutes, 3 fois par jour.
- **Marche en plein air** : idéale pour déconnecter et oxygéner le cœur.
- **Méditation guidée** : applications ou podcasts de pleine conscience.
- **Activités créatives** : jardinage, musique, cuisine...

## L'importance du lien social

Parler de ses difficultés, partager des moments avec ses proches et demander de l'aide en cas de besoin contribuent à réduire le stress et à protéger le cœur.

> **Disclaimer** : Ce contenu est informatif et ne remplace pas un avis médical.`,
    category: "stress",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    readTime: 4,
    publishedAt: new Date("2026-03-18"),
    featured: true,
  },
  {
    id: "a6",
    slug: "arreter-fumer-coeur",
    title: "Arrêter de fumer : le cadeau le plus rapide pour votre cœur",
    excerpt:
      "Après quelques semaines sans tabac, le risque cardiovasculaire baisse déjà. Découvrez les bénéfices et les ressources pour vous accompagner.",
    content: `## Les effets du tabac sur le cœur

La cigarette favorise la formation de plaques d'athérome, augmente la tension artérielle, diminue l'oxygénation du sang et accélère le rythme cardiaque.

## Une amélioration rapide

- 20 minutes : le rythme cardiaque se normalise.
- 12 heures : le taux de monoxyde de carbone diminue.
- 2 à 12 semaines : la circulation sanguine s'améliore.
- 1 an : le risque d'infarctus est divisé par deux.

## Où trouver de l'aide ?

- Tabac Info Service : 39 89 (numéro gratuit)
- Votre médecin traitant ou cardiologue
- Les consultations tabacologiques

> **Disclaimer** : Ce contenu est informatif et ne remplace pas un avis médical.`,
    category: "tabac",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    readTime: 4,
    publishedAt: new Date("2026-04-02"),
    featured: false,
  },
];

export const explorations: Exploration[] = [
  {
    id: "e1",
    slug: "ecg",
    title: "ECG",
    shortDescription: "Enregistrement de l'activité électrique du cœur.",
    fullDescription:
      "L'électrocardiogramme (ECG) est un examen simple, rapide et indolore qui enregistre l'activité électrique du cœur. Il aide à détecter les troubles du rythme, les signes d'ischémie ou les séquelles d'un infarctus.",
    whyPrescribed:
      "Votre médecin peut prescrire un ECG en cas de palpitations, de douleur thoracique, d'essoufflement, avant une chirurgie, ou lors d'un bilan de santé cardiovasculaire.",
    steps: JSON.stringify([
      "Vous vous allongez sur une table d'examen.",
      "Le soignant place 10 électrodes sur la poitrine, les bras et les jambes.",
      "L'appareil enregistre l'activité électrique pendant quelques secondes.",
      "Le cardiologue analyse le tracé et vous explique les résultats.",
    ]),
    preparation:
      "Aucune préparation particulière n'est nécessaire. Évitez de faire du sport intense juste avant l'examen. Prévoyez une tenue permettant d'accéder facilement à la poitrine, aux chevilles et aux poignets.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    icon: "activity",
  },
  {
    id: "e2",
    slug: "echocardiographie",
    title: "Échocardiographie",
    shortDescription: "Ultrasons pour visualiser le cœur en mouvement.",
    fullDescription:
      "L'échocardiographie utilise les ultrasons pour obtenir des images du cœur, de ses valves, de ses cavités et de sa fonction de pompe. C'est un examen non invasif et indolore.",
    whyPrescribed:
      "Elle permet d'évaluer les valves cardiaques, la force de contraction du ventricule gauche, la présence d'un souffle, ou de suivre une maladie cardiaque connue.",
    steps: JSON.stringify([
      "Vous vous allongez sur le côté gauche.",
      "Le cardiologue applique un gel sur la poitrine.",
      "Il déplace une sonde pour visualiser le cœur sous différents angles.",
      "L'examen dure 15 à 30 minutes. Les images sont analysées en direct.",
    ]),
    preparation:
      "Aucune préparation spécifique. Portez une tenue confortable. Vous pouvez manger et prendre vos médicaments normalement.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    icon: "heart-pulse",
  },
  {
    id: "e3",
    slug: "epreuve-effort",
    title: "Épreuve d'effort",
    shortDescription: "Évaluation du cœur sous effort contrôlé.",
    fullDescription:
      "L'épreuve d'effort (ou test d'effort) mesure la réponse du cœur à l'exercice physique, généralement sur un tapis roulant ou un vélo ergomètre. Elle aide à détecter une ischémie cardiaque indiscernable au repos.",
    whyPrescribed:
      "Elle est prescrite en cas de douleur thoracique à l'effort, pour évaluer la tolérance à l'effort après un infarctus, ou pour explorer une dyspnée (essoufflement) d'effort.",
    steps: JSON.stringify([
      "Pose des électrodes ECG et d'un brassard tensionnel.",
      "Exercice progressif sur tapis ou vélo, guidé par un soignant.",
      "Arrêt de l'effort si symptômes ou objectif atteint.",
      "Récupération surveillée et interprétation du tracé.",
    ]),
    preparation:
      "Venez en tenue de sport et avec des chaussures adaptées. Évitez de manger un repas copieux dans les 2 heures précédant l'examen. Poursuivez vos traitements habituels sauf avis contraire de votre médecin.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    icon: "bike",
  },
  {
    id: "e4",
    slug: "holter",
    title: "Holter rythmique et tensionnel",
    shortDescription: "Surveillance continue du rythme et de la tension sur 24 h.",
    fullDescription:
      "Le Holter est un petit boîtier enregistreur que l'on porte pendant 24 à 48 heures. Il enregistre en continu l'ECG (Holter rythmique) ou la tension artérielle (Holter tensionnel) pour capturer des anomalies intermittentes.",
    whyPrescribed:
      "Il est utile pour explorer des palpitations, des vertiges, des malaises, ou pour évaluer le contrôle de l'hypertension sur une journée complète.",
    steps: JSON.stringify([
      "Pose du boîtier et des électrodes ou du brassard automatique.",
      "Vous rentrez chez vous et poursuivez vos activités habituelles.",
      "Vous notez dans un journal les symptômes éventuels et leurs horaires.",
      "Retour au cabinet le lendemain pour retirer l'appareil et analyser les données.",
    ]),
    preparation:
      "Prenez une douche avant la pose, car vous ne pourrez pas vous mouiller pendant l'enregistrement. Portez des vêtements amples pour dissimuler le boîtier.",
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80",
    icon: "clock",
  },
  {
    id: "e5",
    slug: "bilan-lipidique",
    title: "Bilan lipidique",
    shortDescription: "Analyse sanguine du cholestérol et des triglycérides.",
    fullDescription:
      "Le bilan lipidique est une prise de sang qui mesure le cholestérol total, le LDL, le HDL et les triglycérides. C'est un examen de base pour évaluer le risque cardiovasculaire.",
    whyPrescribed:
      "Il est prescrit lors d'un bilan de prévention, pour suivre une dyslipidémie connue, ou pour évaluer l'efficacité d'un traitement ou d'un régime.",
    steps: JSON.stringify([
      "Prise de rendez-vous au laboratoire d'analyses médicales.",
      "Prise de sang à jeun, généralement le matin.",
      "Les résultats sont disponibles en quelques heures à quelques jours.",
      "Interprétation avec votre médecin lors de la consultation.",
    ]),
    preparation:
      "Le bilan lipidique nécessite généralement d'être à jeun (12 heures sans manger, eau autorisée). Suivez les consignes du laboratoire et de votre médecin.",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80",
    icon: "flask-conical",
  },
];

export const regimes: Regime[] = [
  {
    id: "r1",
    slug: "hypertension",
    title: "Régime adapté à l'hypertension artérielle",
    pathology: "Hypertension artérielle (HTA)",
    summary:
      "Un régime pauvre en sel, riche en fruits, légumes et produits laitiers allégé, qui aide à baisser la tension artérielle.",
    breakfast: "Fromage blanc 0 % avec fruits rouges, pain complet, thé ou café sans sucre ajouté.",
    lunch:
      "Salade de lentilles, poisson grillé, légumes vapeur, huile d'olive, pain complet, fruit frais.",
    dinner: "Soupe de légumes, blanc de volaille, quinoa, salade verte, yaourt nature.",
    snacks: "Fruits frais, amandes non salées, bâtonnets de carottes, yaourt nature.",
    allowed:
      "Fruits, légumes, légumineuses, céréales complètes, poisson, volaille, huile d'olive, produits laitiers allégés.",
    forbidden:
      "Plats industriels, charcuterie, fromages salés, conserves, pain de mie, sodas salés.",
    tips: "Ne resalez pas votre assiette, lisez les étiquettes, privilégiez les aliments frais et cuisinez maison autant que possible.",
    downloadUrl: "/downloads/regime-hta.pdf",
  },
  {
    id: "r2",
    slug: "cholesterol",
    title: "Régime pour équilibrer le cholestérol",
    pathology: "Hypercholestérolémie",
    summary:
      "Réduisez les graisses saturées et les trans, augmentez les fibres et les oméga-3 pour favoriser un profil lipidique équilibré.",
    breakfast: "Flocons d'avoine avec lait végétal, fruits frais, noix concassées.",
    lunch: "Salade de quinoa aux légumes, saumon au four, compote sans sucre.",
    dinner: "Velouté de courgettes, escalope de dinde, riz complet, salade.",
    snacks: "Pomme, noix de cajou non salées, carottes râpées.",
    allowed:
      "Légumineuses, céréales complètes, fruits à coque non salés, poisson gras, huile d'olive, légumes, fruits.",
    forbidden:
      "Beurre, crème, charcuterie, friture, viennoiseries, produits industriels riches en graisses saturées.",
    tips: "Mangez des fibres à chaque repas, limitez les viandes rouges à 2 fois par semaine, préférez la cuisson vapeur ou au four.",
    downloadUrl: "/downloads/regime-cholesterol.pdf",
  },
  {
    id: "r3",
    slug: "post-infarctus",
    title: "Alimentation post-infarctus",
    pathology: "Post-infarctus / cardiopathie ischémique",
    summary:
      "Une alimentation protectrice, pauvre en sel et en graisses saturées, riche en oméga-3 et en fibres, pour accompagner la récupération.",
    breakfast: "Pain complet, fromage blanc 0 %, fruits frais, café ou thé.",
    lunch: "Pois chiches et légumes grillés, filet de poisson, riz complet, fruit.",
    dinner: "Soupe de légumes, dinde vapeur, purée de patate douce, salade.",
    snacks: "Fruits frais, yaourt nature, amandes, tomates cerises.",
    allowed:
      "Aliments riches en oméga-3, fibres, légumineuses, volaille, poisson, céréales complètes, huile d'olive.",
    forbidden:
      "Sel excessif, graisses saturées, friture, alcool, sodas sucrés, repas trop copieux.",
    tips: "Faites 3 repas légers et 1 à 2 collations, mangez lentement, surveillez votre poids et poursuivez votre rééducation cardiaque.",
    downloadUrl: "/downloads/regime-post-infarctus.pdf",
  },
];

export const questions: Question[] = [
  {
    id: "q1",
    author: "Marie, 62 ans",
    content: "Je ressens parfois des palpitations après le café. Dois-je m'inquiéter ?",
    answer:
      "Les palpitations peuvent être liées à la caféine, au stress ou à un trouble du rythme. Il est recommandé de réduire le café et de consulter votre cardiologue si elles persistent, surtout si elles sont accompagnées de vertiges, d'essoufflement ou de douleur thoracique.",
    votes: 12,
    createdAt: new Date("2026-05-01"),
  },
  {
    id: "q2",
    author: "Paul, 58 ans",
    content: "Quelle est la différence entre un ECG et une échocardiographie ?",
    answer:
      "L'ECG enregistre l'activité électrique du cœur, tandis que l'échocardiographie utilise les ultrasons pour visualiser l'anatomie du cœur et sa fonction de pompage. Les deux examens sont complémentaires.",
    votes: 8,
    createdAt: new Date("2026-05-05"),
  },
  {
    id: "q3",
    author: "Anonyme",
    content: "Mon cholesterol LDL est à 1,8 g/L. Est-ce trop élevé ?",
    answer:
      "Cela dépend de votre profil de risque cardiovasculaire global. En l'absence de facteur de risque, un LDL entre 1,6 et 1,9 g/L peut être acceptable. En présence de maladie cardiovasculaire, l'objectif est souvent inférieur à 1,0 g/L. Discutez-en avec votre médecin.",
    votes: 15,
    createdAt: new Date("2026-05-10"),
  },
  {
    id: "q4",
    author: "Sophie, 70 ans",
    content: "Peut-on faire du sport après un stent ?",
    answer:
      "Oui, après une période de récupération et avec l'accord de votre cardiologue. La rééducation cardiaque propose un programme progressif et sécurisé. En général, on recommande une activité modérée régulière.",
    votes: 10,
    createdAt: new Date("2026-05-15"),
  },
  {
    id: "q5",
    author: "Luc, 45 ans",
    content: "Quels sont les signes d'alerte d'un infarctus ?",
    answer:
      "Les signes principaux sont une douleur intense au centre de la poitrine, une sensation d'écrasement, une douleur irradiant dans le bras gauche, la mâchoire ou le dos, un essoufflement, des nausées ou des sueurs. En cas de doute, appelez le 14 (Protection civile) immédiatement.",
    votes: 23,
    createdAt: new Date("2026-05-20"),
  },
];

export const tips: Tip[] = [
  {
    id: "t1",
    title: "Mangez 5 portions de fruits et légumes par jour",
    category: "alimentation",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
    summary:
      "Les fruits et légumes apportent vitamines, minéraux et fibres qui protègent les vaisseaux sanguins.",
  },
  {
    id: "t2",
    title: "Marchez 30 minutes chaque jour",
    category: "activité physique",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=80",
    summary:
      "Une marche régulière suffit à améliorer la circulation, la pression artérielle et le moral.",
  },
  {
    id: "t3",
    title: "Respirez 5 minutes pour apaiser le cœur",
    category: "stress",
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=600&q=80",
    summary:
      "La respiration lente et profonde active le système nerveux parasympathique et réduit le stress.",
  },
  {
    id: "t4",
    title: "Dites stop au tabac",
    category: "tabac",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
    summary:
      "Arrêter de fumer est le geste le plus impactant pour votre cœur. Les bénéfices commencent dès les premières heures.",
  },
  {
    id: "t5",
    title: "Dormez 7 à 8 heures par nuit",
    category: "sommeil",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    summary:
      "Un sommeil réparateur régule la tension artérielle et diminue l'inflammation chronique.",
  },
];

export const survey: Survey = {
  id: "sv1",
  question: "Connaissez-vous les signes d'alerte d'un AVC ?",
  options: JSON.stringify([
    "Face qui tombe d'un côté",
    "Difficulté à lever un bras",
    "Troubles de la parole",
    "Toutes ces réponses",
  ]),
  correctAnswer: 3,
};

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug) ?? null;
}

export function getExplorationBySlug(slug: string) {
  return explorations.find((e) => e.slug === slug) ?? null;
}

export function getArticlesSorted() {
  return [...articles].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export function getQuestionsSorted() {
  return [...questions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getTopQuestions(n = 2) {
  return [...questions].sort((a, b) => b.votes - a.votes).slice(0, n);
}
