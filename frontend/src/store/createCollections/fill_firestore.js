// Importation des modules Firebase
import admin from 'firebase-admin';

// Initialisation de Firebase
admin.initializeApp({
  credential: admin.credential.cert('./secretAcountNode.json'),
});

// Connexion à Firestore
const db = admin.firestore();

// Données structurées de manière hiérarchique
const data = {
  "Commun à toutes les filières": {
    "Mathématiques": ["Algèbre", "Géométrie", "Trigonométrie", "Calcul", "Statistiques"],
    "Français": ["Grammaire", "Littérature", "Littérature africaine", "Expression écrite", "Compréhension de texte", "Orthographe", "Littérature française"],
    "Anglais": ["Grammar", "Vocabulary", "Reading Comprehension", "Writing", "Speaking"],
    "Sciences Naturelles": [],
    "Histoire et Géographie": [],
    "Éducation Physique": [],
    "Informatique": ["Informatique générale"],
    "Dissertation": ["Analyse de sujet", "Plan détaillé", "Introduction", "Développement", "Conclusion"]
  },
  "Littéraire": {
    "Philosophie": ["Éthique", "Métaphysique", "Épistémologie", "Philosophie politique", "Logique"],
    "Sociologie": [],
    "Psychologie Génétique": ["Développement cognitif", "Étapes de croissance", "Apprentissage", "Mémoire", "Langage"],
    "Latin": ["Morphologie", "Syntaxe", "Traduction", "Texte latin", "Civilisation romaine"]
  },
  "Scientifique": {
    "Physique": ["Mécanique", "Optique", "Thermodynamique", "Électromagnétisme", "Physique nucléaire"],
    "Chimie": ["Chimie organique", "Chimie inorganique", "Réactions chimiques", "Analyse", "Biochimie"],
    "Biologie approfondie": ["Biologie moléculaire", "Génétique avancée"],
    "Biologie": ["Anatomie", "Physiologie", "Écologie", "Génétique", "Microbiologie"]
  },
  "Commerciale": {
    "Comptabilité": ["Comptabilité générale", "Analyse financière", "Bilan", "Compte de résultat", "Plan comptable"],
    "Économie": [],
    "Gestion d'entreprise": [],
    "Comptabilité Analytique": ["Coûts complets", "Coûts variables", "Seuil de rentabilité", "Centres de coût", "Méthodes d'analyse"],
    "Fiscalité": ["TVA", "Impôt sur le revenu", "Taxe professionnelle", "Déclarations fiscales", "Contrôle fiscal"],
    "Finances Publiques": ["Budget de l'État", "Déficit public", "Dette publique", "Politiques budgétaires", "Recettes et dépenses"]
  },
  "Pédagogique": {
    "Méthodologie d'enseignement": [],
    "Psychologie de l'enfant": [],
    "Psychologie": ["Psychologie clinique", "Psychologie sociale", "Psychologie cognitive", "Psychopathologie", "Psychologie du développement"],
    "Pédagogie": ["Méthodes d'enseignement", "Évaluation", "Planification", "Enseignement actif", "Environnement éducatif"],
    "Didactique Générale": ["Théories d'enseignement", "Objectifs pédagogiques", "Stratégies d'apprentissage", "Outils d'enseignement", "Évaluation didactique"],
    "Didactique de discipline": ["Méthodes spécifiques", "Planification disciplinaire", "Évaluation ciblée", "Ressources didactiques", "Pratiques d'enseignement"]
  },
  "Technique": {
    "Électronique": ["Circuits", "Composants électroniques", "Systèmes numériques"],
    "Électricité": ["Théorie de l'électricité", "Installations électriques", "Électrotechnique"],
    "Mécanique": ["Mécanique des fluides", "Thermodynamique", "Cinématique"],
    "Dessin technique": ["Dessins assistés par ordinateur", "Normes de dessin", "Projections techniques"]
  }
};

async function populateFirestore() {
  for (const [category, courses] of Object.entries(data)) {
    const categoryId = category.toLowerCase().replace(/ /g, '_');
    await db.collection('categories').doc(categoryId).set({ name: category });
    console.log(`Catégorie ajoutée : ${category}`);

    for (const [course, subjects] of Object.entries(courses)) {
      const courseId = course.toLowerCase().replace(/ /g, '_');
      await db.collection('cours').doc(courseId).set({
        name: course,
        categoryId: categoryId,
      });
      console.log(`  - Cours ajouté : ${course}`);

      for (const subject of subjects) {
        const subjectId = subject.toLowerCase().replace(/ /g, '_');
        await db.collection('matieres').doc(subjectId).set({
          name: subject,
          courseId: courseId,
        });
        console.log(`    - Matière ajoutée : ${subject} (pour le cours ${course})`);
      }
    }
  }
  console.log('Les données ont été ajoutées avec succès dans Firestore.');
}

populateFirestore().catch(console.error);
