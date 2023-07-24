/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import NotFound from '../NotFound';
import { useAppDispatch, useAppSelector } from "../../../../../state/hooks";
import {
  useGetQuestionsQuery,
  useGetStageQuery,
} from "../../../../../services/stage";
import LinkButton from "../../../../LinkButton";
import { GeneralQuestionsFormProps } from "../../../Education/GeneralQuestionsForm"
import * as Yup from 'yup';
import { AiOutlineCheck } from 'react-icons/ai';
import './style.css';
import { Formik, Field, Form } from 'formik';
import { BiSolidDownArrow } from 'react-icons/bi';
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { addData, addPage } from 'state/dataSlice';
import Experiences from '../Experiences';
import Experienced from '../Experienced';
const ExperienceValid = Yup.object().shape({
  company: Yup.string().required('Please provide New Password'),
  duty: Yup.string().required('Please provide New Password'),
  labour: Yup.string().required('Please provide New Password'),
  professionalism: Yup.string().required('Please provide New Password'),
  workStart: Yup.string().required('Please provide New Password'),
  options: Yup.boolean().required('Please provide New Password')
});
interface RootState {
  dataa: {
    datas: []; 
    currentPage:1
  };
}

const CheckBox: React.FC<GeneralQuestionsFormProps> = ({ stageIndex, subStageSlug }) => {
  const { data: stagesData } = useGetStageQuery()
  const [experience, setExperience] = useState<boolean>(false);
  const datas = useSelector((state: RootState) => state.dataa.datas);
  const page = useSelector((state: RootState) => state.dataa.currentPage);
  const dispatch: Dispatch = useDispatch();
  const { stage_children } = stagesData?.[stageIndex] || {};
  const {
    slug: nextSlugName,
    stage_name: nextStageName,
    stage_children: nextStageChildren,
  } = stagesData?.[stageIndex + 1] || {};

  const {
    slug: prevSlugName,
    stage_name: prevStageName,
    stage_children: prevStageChildren,
  } = stagesData?.[3] || {};



  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    prevStageChildren?.[0] || {};

  const { slug: subSlugName } = stage_children?.[0] || {};

  const { slug: nextSubSlugName, stage_name: nextSubStageName } =
    nextStageChildren?.[0] || {};
    const {
      data: questionsData,
      error: questionsError,
      isLoading,
    } = useGetQuestionsQuery(subSlugName);
  
 
    const Page = ()=>{
      if (Number(page) === 2) {
        return (
          <Experiences
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );
      }else{
        return(
          <Experienced/>
        )
      }
    }
    console.log(questionsData);
    
    const questions = questionsData?.[0]?.questions;
    
  return (
    <div>
      {
        page===1? <div>
        <div className="checkbox">
          <h2>İş təcrübəniz var?</h2>
          <div className="check-flex">
            <div>
              <label htmlFor="beli">Bəli</label>
              <input
                name="choose"
                type="radio"
                id="beli"
                value="beli"
                onClick={() => {
                  setExperience(true);
                }}
              />
            </div>
            <div className="noCheck">
              <label htmlFor="xeyr">Xeyr</label>
              <input
                name="choose"
                type="radio"
                id="xeyr"
                value="xeyr"
                onClick={() => {
                  setExperience(false);
                }}
              />
            </div>
          </div>
        </div>
        {experience ? (
          <Zoom duration={1000}>
                <div>
        <Formik
          initialValues={{
            id:0,
            company: '',
            duty: '',
            labour: '',
            professionalism: '',
            workStart: '',
            workEnd: '',
            options: false
          }}
          
          validationSchema={ExperienceValid}
          onSubmit={(values, { resetForm }) => {
            const copy = {
              id:datas.length+1,
              company: values.company,
              duty: values.duty,
              labour: values.labour,
              professionalism: values.professionalism,
              workStart: values.workStart,
              workEnd: values.workEnd,
              options: values.options
            }
            dispatch(addData(copy))
            dispatch(addPage(1))
            
            toast.success('tecrubeniz elave olundu', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            });
            resetForm({});
          }}
        >
          {({ values, errors, touched }) => (
            <Form className="form-worker">
              <div>
                <div className="company">
                  <label>Çalışdığınız müəssisənin adını qeyd edin.*</label>
                  <Field name="company" type="text" className="textInp" />
                </div>
                <div className="duty">
                  <label>Vəzifənizi qeyd edin.*</label>
                  <Field name="duty" type="text" className="textInp" />
                </div>
                <div className="labourProfessionalism">
                  <div className="labour">
                    <label>Əmək fəaliyyət forması:</label>
                    <div className="custom-select">
                      <Field name="labour" as="select">
                        <option value=''> </option>
                        {
                          questions?.[3].answers.map((elem,index)=>(
                            <option value={elem.answer_title} key={index}>{elem.answer_title}</option>
                          ))
                        }
                      </Field>
                      <span className="custom-arrow">
                        <BiSolidDownArrow className="icon" />
                      </span>
                    </div>
                  </div>
                  <div className="profes">
                    <label>Peşəkarlıq dərəcəsi:</label>
                    <div className="custom-select">
                      <Field name="professionalism" as="select">
                      <option value=""> </option>
                      {
                          questions?.[4].answers.map((elem,index)=>(
                            <option value={elem.answer_title} key={index}>{elem.answer_title}</option>
                          ))
                        }
                      </Field>
                      <span className="custom-arrow">
                        <BiSolidDownArrow className="icon" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="startEnd">
                  <div>
                    <label>İşə başlama tarixi: </label>
                    <Field type="month" name="workStart" />
                  </div>
                  <div className="workEnd">
                    <label>İşdən ayrılma tarixi: </label>
                    <Field type="month" name="workEnd" />
                  </div>
                </div>
                <div className="options">
                  <Field type="checkbox" name="options" />
                  <label>Hal hazırda çalışıram.</label>
                </div>
                <div className="save">
                  <button className="save-data" type="submit">
                    Yadda saxla <AiOutlineCheck className="icon" />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
          </Zoom>
        ) : (
          <NotFound />
        )}
        </div>:Page()
      }
     
    
      <LinkButton
        nav={{
          state: { stageName: prevStageName, subStageName: prevSubStageName },
          path: { slugName: prevSlugName, subSlugName: prevSubSlugName },
        }}
        type="outline"
        label="Geri"
        className="absolute left-0 -bottom-20"
      />
    </div>
  );
}

export default CheckBox;