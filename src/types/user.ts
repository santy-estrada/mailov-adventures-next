import { Activity } from "./activity";
import { DateIdea } from "./date";
import { Fact } from "./fact";
import { Partnership } from "./partnership";
import { Question } from "./question";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    points: number;
    facts?: Fact[];
    dateIdeas?: DateIdea[];
    questions?: Question[];
    activities?: Activity[];
    partnershipsAsUser1?: Partnership[];
    partnershipsAsUser2?: Partnership[];
  }
  