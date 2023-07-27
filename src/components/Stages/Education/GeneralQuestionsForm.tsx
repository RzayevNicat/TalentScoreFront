import { useEffect,useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetQuestionsQuery,
  useGetStageQuery,
} from "../../../services/stage";
import { Listbox } from "@headlessui/react";
import { Icon } from "@iconify/react";
import TextInput from "../../TextInput";
import Radio from "../../RadioInput";
import { EducationItem } from 'state/dataSlice';
import Select from "../../Select";
import LinkButton from "../../LinkButton";
import { updateStageForm } from "../../../state/stages/stageFormSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { useSelector } from 'react-redux';
import { Field, Formik } from "formik";
import Bakalavr from "./Bakalavr";
import Magistr from "./Magistr";
import Doktorantura from "./Doktorantura";
export type GeneralQuestionsFormValues = {
  firstName: string;
  lastName: string;
  workExp: string;
  curOccupation: { id: number; answer: string };
  education: { id: number; answer: string };
  educationGrant: { id: number; answer: string };
};

export type GeneralQuestionsFormProps = {
  subStageSlug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stageIndex: any;
};
interface RootState {
	dataa: {
		education: [];
	};
}
const GeneralQuestionsForm = ({
  stageIndex,
  subStageSlug,
}: GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();
  const education: EducationItem[] = useSelector((state: RootState) => state.dataa.education);
  const [val,setVal] = useState('')
  const {
    slug: slugName,
    stage_name: stageName,
    stage_children,
  } = stagesData?.[0] || {};

  const { slug: subSlugName, stage_name: subStageName } =
    stage_children?.[stageIndex + 1] || {};

  const {
    data: questionsData,
    error: questionsError,
    isLoading,
  } = useGetQuestionsQuery(subStageSlug);

  const dispatch = useAppDispatch();

  const { formData } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === subStageSlug
    ) as { formData: GeneralQuestionsFormValues }) || {};

  const { register, handleSubmit, watch, reset } =
    useForm<GeneralQuestionsFormValues>({
      defaultValues: {
        firstName: "",
        lastName: "",
        workExp: "",
        curOccupation: { id: 0, answer: "" },
        education: { id: 0, answer: "" },
        educationGrant: { id: 0, answer: "" },
      },
    });

  const onSubmit: SubmitHandler<GeneralQuestionsFormValues> = (data) => data;

  useEffect(() => {
    const subscription = watch((value) => {
      setVal(String(value?.education?.answer));
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as GeneralQuestionsFormValues,
        })
      );
    });

    reset(formData);
    return () => subscription.unsubscribe();
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const questions = questionsData?.[0]?.questions;

  
  return (
    <div>
      {
        education.length ===0? <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex-col flex gap-5"
      >
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Ad*"
            register={register("firstName", { required: true })}
          />
          <TextInput label="Soyad*" register={register("lastName")} />
        </div>
  
        <div className="space-y-2">
          <label className="pl-2">{questions?.[0]?.question_title}*</label>
  
          <div className="flex gap-5">
            {questions?.[0]?.answers?.map(({ answer_title, id }) => (
              <Radio
                key={id}
                label={answer_title}
                value={id}
                register={register("workExp")}
              />
            ))}
          </div>
        </div>
  
        {formData?.workExp && (
          <>
            <Select
              label={`${questions?.[1]?.question_title}*`}
              options={questions?.[1]?.answers?.filter(
                ({ answer_dependens_on }) =>
                  answer_dependens_on === parseInt(formData?.workExp)
              )}
              register={register("curOccupation")}
              value={formData?.curOccupation?.answer}
            />
  
            <Select
              label={`${questions?.[2]?.question_title}*`}
              options={questions?.[2]?.answers}
              register={register("education")}
              value={formData?.education?.answer}
            />
  
            <Select
              label={`${questions?.[3]?.question_title}*`}
              options={questions?.[3]?.answers}
              register={register("educationGrant")}
              value={formData?.educationGrant?.answer}
            />
          </>
        )}
  

      </form>:
      <div className="h-[500px] overflow-y-scroll max-w-xl overflow-hidden ">
       
       <Select
              label={`${education.length +1}-ci Təhsilinizi qeyd edin?*`}
              options={questions?.[2]?.answers}
              register={register("education")}
              value={formData?.education?.answer}
            />
        {
          val==='Bakalavr'?<Bakalavr/>:null
        }
                {
          val==='Magistratura'?<Magistr/>:null
        }
                {
          val==='PhD'?<Doktorantura/>:null
        }
      </div>
      }
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

export default GeneralQuestionsForm;
