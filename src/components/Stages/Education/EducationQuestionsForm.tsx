
import './education.css'
import {useGetStageQuery} from "../../../services/stage";


import LinkButton from "../../LinkButton";


import {
  GeneralQuestionsFormProps
} from "./GeneralQuestionsForm";
import { useSelector } from 'react-redux';
import Bakalavr from './Bakalavr';
import Magistr from './Magistr';
import Doktorantura from './Doktorantura';
import Educations from './Educations';
import { Zoom } from 'react-awesome-reveal';

export type EducationQuestionsFormValues = {
  vocationalScore: string;
  bachelorsScore: string;
  masterScore: string;
  phdScore: string;
};
interface Answer {
  id: number;
  answer_title: string;
  answer_weight: number | null;

}

interface Question {
  id: number;
  answers: Answer[];
  question_title: string;
  question_type: "select" | "button" | "input"; 
  question_index: number;
  question_dependens_on_answer: any | null; 
  question_dependens_on_question: any | null; 
}

interface Stage {
  id: number;
  questions: Question[];
  stage_name: string;
  slug: string;
  stage_index: number | null;
}
interface RootState {
  dataa: {

    educationPage: 1,
    educationID:'',
    dataPage:number,
  };
}

const EducationQuestionsForm = ({
  subStageSlug,
  stageIndex,
}: GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();
  const educationId = useSelector((state: RootState) => state.dataa.educationID);
  const educationPage = useSelector((state: RootState) => state.dataa.educationPage);
  const dataPage = useSelector((state: RootState) => state.dataa.dataPage);

 
const DisplayEducation=()=>{
  if (educationPage===1) {
    return <Zoom> <Bakalavr/></Zoom>
   
  }else if(educationPage===2){
    return <Zoom><Magistr/></Zoom>
  }
  else if(educationPage===3){
    return <Zoom><Doktorantura/></Zoom>
  }
}
console.log(educationPage);
  const {
    slug: slugName,
    stage_name: stageName,
    stage_children,
  } = stagesData?.[stageIndex] || {};
  const { slug: subSlugName, stage_name: subStageName } =
    stage_children?.[stageIndex + 2] || {};

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    stage_children?.[stageIndex] || {};

      console.log(educationId);
      
  return (
    <div className="h-[500px] overflow-y-scroll max-w-xl overflow-hidden">  
    {
      dataPage===1? <div>
      {
          DisplayEducation()
      }
        </div> :<Educations stageIndex={stageIndex} subStageSlug={subStageSlug}/>
    }
   
   <LinkButton
        nav={{
          state: { stageName, subStageName },
          path: { slugName, subSlugName: prevSubSlugName },
        }}
        type='outline'
        label="Geri"
        className="absolute left-0 -bottom-20"
      />


      <LinkButton
        nav={{
          state: { stageName, subStageName },
          path: { slugName, subSlugName },
        }}
        
        label="Növbəti"
        className="absolute right-0 -bottom-20"
      />
    </div>
  );
};

export default EducationQuestionsForm;
