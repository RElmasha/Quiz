import { collection, getDocs, query, where, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "../firebase/firbaseConfig"; // Ensure this path is correct

export interface Category {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
  categoryId: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  question: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(collection(db, "categories"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Category));
};

export const fetchCoursesByCategory = async (categoryId: string): Promise<Course[]> => {
  const q = query(collection(db, "cours"), where("categoryId", "==", categoryId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Course));
};

export const fetchSubjectsByCourse = async (courseId: string): Promise<Subject[]> => {
  const q = query(collection(db, `cours/${courseId}/matieres`));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Subject));
};

export const fetchQuestionsBySubject = async (subjectId: string): Promise<Question[]> => {
  const q = query(collection(db, `matieres/${subjectId}/questions`));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Question));
};

