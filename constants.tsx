
import { Topic } from './types';

export const TOPICS: Topic[] = [
  // Grade 6 - Biology
  {
    id: 'bio-6-1',
    grade: 6,
    subject: 'Biology',
    title: 'Components of Food',
    description: 'Understanding carbohydrates, proteins, fats, vitamins, and minerals.',
    content: 'Our body needs various nutrients to stay healthy. Carbohydrates and fats give us energy. Proteins are for growth and repair. Vitamins and minerals protect us from diseases. A balanced diet includes all these in the right amounts.',
    fact: 'Vitamin C is easily destroyed by heat during cooking.',
    quiz: [
      { question: 'Which nutrient is known as the "energy-giving" food?', options: ['Protein', 'Carbohydrates', 'Vitamins', 'Water'], correctIndex: 1 }
    ]
  },
  {
    id: 'bio-6-2',
    grade: 6,
    subject: 'Biology',
    title: 'Getting to Know Plants',
    description: 'Difference between herbs, shrubs, trees, creepers, and climbers.',
    content: 'Plants are classified based on their size and stem type. Herbs are small with green tender stems. Shrubs have woody stems branching near the base. Trees are tall with a thick brown trunk.',
    fact: 'The Giant Sequoia is the world\'s largest tree by volume.',
    quiz: [
      { question: 'Which of these is a climber?', options: ['Tomato', 'Money Plant', 'Lemon', 'Wheat'], correctIndex: 1 }
    ]
  },
  // Grade 6 - Chemistry
  {
    id: 'che-6-1',
    grade: 6,
    subject: 'Chemistry',
    title: 'Sorting Materials',
    description: 'Properties like luster, hardness, and solubility.',
    content: 'Materials can be grouped by properties. Some are shiny (lustrous) like metals. Others are dull. Some dissolve in water (soluble) while others don\'t (insoluble).',
    fact: 'Gold is one of the most lustrous and least reactive metals.',
    quiz: [
      { question: 'Which material is transparent?', options: ['Wood', 'Cardboard', 'Glass', 'Stone'], correctIndex: 2 }
    ]
  },
  {
    id: 'che-6-2',
    grade: 6,
    subject: 'Chemistry',
    title: 'Separation of Substances',
    description: 'Winnowing, Sieving, Sedimentation, and Decantation.',
    content: 'Separation methods help us get pure substances. Handpicking is for large impurities. Winnowing uses wind to separate grain from husk. Decantation is pouring out liquid after sediment settles.',
    fact: 'Distillation is used to obtain pure water from seawater.',
    quiz: [
      { question: 'Which process uses wind to separate heavier and lighter components?', options: ['Sieving', 'Threshing', 'Winnowing', 'Decantation'], correctIndex: 2 }
    ]
  },
  // Grade 7 - Biology
  {
    id: 'bio-7-1',
    grade: 7,
    subject: 'Biology',
    title: 'Nutrition in Animals',
    description: 'Digestion in humans and grass-eating animals.',
    content: 'Digestion starts in the mouth with saliva. It passes through the esophagus to the stomach, where juices break down proteins. Small intestine is where most absorption happens.',
    fact: 'The human small intestine is about 7 meters long!',
    quiz: [
      { question: 'Where is bile juice produced?', options: ['Stomach', 'Pancreas', 'Liver', 'Gallbladder'], correctIndex: 2 }
    ]
  },
  {
    id: 'bio-7-2',
    grade: 7,
    subject: 'Biology',
    title: 'Respiration in Organisms',
    description: 'Aerobic vs Anaerobic respiration and breathing mechanisms.',
    content: 'Respiration is the process of breakdown of food in cells to release energy. Aerobic uses oxygen. Anaerobic (like in yeast) happens without oxygen and produces alcohol.',
    fact: 'Frogs can breathe through both their lungs and their moist skin.',
    quiz: [
      { question: 'What is the end product of anaerobic respiration in yeast?', options: ['Water', 'Alcohol', 'Lactic Acid', 'Glucose'], correctIndex: 1 }
    ]
  },
  // Grade 8 - Biology
  {
    id: 'bio-8-1',
    grade: 8,
    subject: 'Biology',
    title: 'Microorganisms: Friend and Foe',
    description: 'Bacteria, Fungi, Protozoa, and Viruses.',
    content: 'Microbes are everywhere. Some are useful, like Lactobacillus for curd. Others cause diseases like Malaria (protozoa) or Flu (virus). Antibiotics kill bacteria.',
    fact: 'Penicillin was the first antibiotic discovered by Alexander Fleming.',
    quiz: [
      { question: 'Which of these is a fungal disease?', options: ['Cholera', 'Typhoid', 'Ringworm', 'Polio'], correctIndex: 2 }
    ]
  },
  {
    id: 'bio-8-2',
    grade: 8,
    subject: 'Biology',
    title: 'Cell Structure and Functions',
    description: 'Nucleus, Cytoplasm, and Cell Organelles.',
    content: 'Cells are the building blocks. Plant cells have a cell wall and chloroplasts; animal cells don\'t. The nucleus acts as the control center.',
    fact: 'The ostrich egg is the largest single cell in the world.',
    quiz: [
      { question: 'Which organelle is called the "Powerhouse of the Cell"?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Vacuole'], correctIndex: 1 }
    ]
  },
  // Grade 9 - Chemistry
  {
    id: 'che-9-1',
    grade: 9,
    subject: 'Chemistry',
    title: 'Is Matter Around Us Pure?',
    description: 'Solutions, Suspensions, and Colloids.',
    content: 'A mixture can be homogeneous (solutions) or heterogeneous. Colloids show the Tyndall Effect (scattering of light). Mixtures can be separated by centrifugation, chromatography, or distillation.',
    fact: 'Milk is actually a colloid, not a simple solution.',
    quiz: [
      { question: 'Which of these shows the Tyndall effect?', options: ['Salt solution', 'Milk', 'Copper sulphate solution', 'Sugar solution'], correctIndex: 1 }
    ]
  },
  {
    id: 'che-9-2',
    grade: 9,
    subject: 'Chemistry',
    title: 'Structure of the Atom',
    description: 'Electrons, Protons, Neutrons and Valency.',
    content: 'J.J. Thomson discovered electrons. Rutherford discovered the nucleus. Bohr proposed electron shells. Valency is the combining capacity of an atom.',
    fact: 'Most of an atom is actually empty space!',
    quiz: [
      { question: 'Who discovered the neutron?', options: ['J.J. Thomson', 'Ernest Rutherford', 'James Chadwick', 'Neils Bohr'], correctIndex: 2 }
    ]
  },
  // Grade 10 - Biology
  {
    id: 'bio-10-1',
    grade: 10,
    subject: 'Biology',
    title: 'Heredity and Evolution',
    description: 'Mendel\'s experiments and the origin of species.',
    content: 'Heredity is the transfer of traits from parents to offspring. Mendel used pea plants to study inheritance. Evolution is the slow, continuous process of change over generations.',
    fact: 'Humans share about 98% of their DNA with chimpanzees.',
    quiz: [
      { question: 'Who is known as the "Father of Genetics"?', options: ['Charles Darwin', 'Gregor Mendel', 'Lamarck', 'Watson'], correctIndex: 1 }
    ]
  },
  {
    id: 'bio-10-2',
    grade: 10,
    subject: 'Biology',
    title: 'Control and Coordination',
    description: 'Nervous system and Hormone regulation.',
    content: 'The brain and spinal cord form the central nervous system. Hormones like Insulin (pancreas) and Adrenaline (adrenal glands) regulate body functions chemically.',
    fact: 'A nerve impulse can travel at speeds up to 120 meters per second.',
    quiz: [
      { question: 'Which hormone regulates blood sugar levels?', options: ['Thyroxine', 'Adrenaline', 'Insulin', 'Estrogen'], correctIndex: 2 }
    ]
  },
  // Grade 10 - Chemistry
  {
    id: 'che-10-1',
    grade: 10,
    subject: 'Chemistry',
    title: 'Carbon and its Compounds',
    description: 'Covalent bonding and allotropes of carbon.',
    content: 'Carbon forms covalent bonds due to its tetravalency. Allotropes include Diamond (hardest) and Graphite (conductor). It forms long chains through catenation.',
    fact: 'Buckminsterfullerene (C60) is a spherical allotrope of carbon.',
    quiz: [
      { question: 'Which allotrope of carbon is a good conductor of electricity?', options: ['Diamond', 'Graphite', 'Coke', 'Charcoal'], correctIndex: 1 }
    ]
  },
  {
    id: 'che-10-2',
    grade: 10,
    subject: 'Chemistry',
    title: 'Periodic Classification',
    description: 'Dobereiner, Newlands, Mendeleev, and Modern Periodic Table.',
    content: 'Modern Periodic Law states properties of elements are periodic functions of atomic numbers. Groups are vertical columns; Periods are horizontal rows.',
    fact: 'Mendeleev left gaps in his table for elements that hadn\'t been discovered yet.',
    quiz: [
      { question: 'How many periods are there in the Modern Periodic Table?', options: ['7', '8', '18', '9'], correctIndex: 0 }
    ]
  }
];
