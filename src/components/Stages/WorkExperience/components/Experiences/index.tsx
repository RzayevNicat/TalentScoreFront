import React from 'react';
import './styles.css';
import { GiCancel } from 'react-icons/gi';
import NotFound from '../NotFound';
import { AiOutlinePlus } from 'react-icons/ai';
import { Zoom } from 'react-awesome-reveal';
import { GeneralQuestionsFormProps } from "../../../Education/GeneralQuestionsForm"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import {  addPage, delPage } from 'state/dataSlice';
import { removeData } from 'state/dataSlice';
import {

  useGetStageQuery,
} from "../../../../../services/stage";
import { DataItem } from 'state/dataSlice';
import LinkButton from 'components/LinkButton';
interface RootState {
  dataa: {
    datas: []; 
    currentPage:1
  };
}
const Experiences: React.FC<GeneralQuestionsFormProps> = ({ stageIndex, subStageSlug }) => {
  const { data: stagesData } = useGetStageQuery()
  const datas:DataItem[] = useSelector((state: RootState) => state.dataa.datas);
  const page = useSelector((state: RootState) => state.dataa.currentPage);
  const dispatch: Dispatch = useDispatch();
  const {
    slug: nextSlugName,
    stage_name: nextStageName,
    stage_children: nextStageChildren,
  } = stagesData?.[stageIndex + 1] || {};
  console.log(datas);
  






  const { slug: nextSubSlugName, stage_name: nextSubStageName } =
    nextStageChildren?.[0] || {};
  const handlePage = () => {
    if (datas.length === 0) {
      dispatch(delPage(1));
    } else {
      dispatch(addPage(1));
    }
  };

  const handleDelete = (elem:DataItem) => {
    dispatch(removeData(elem))
  };

  return (
    <div className="experienceTable">
      {datas.length === 0 ? (
        <NotFound />
      ) : (
        datas.map((elem, id) => (
          <Zoom duration={1000} key={id} className='tb'>
            <div className="tablee">
              <p className="td1">
                {elem.id}.{elem.company}
              </p>
              <p className="td2">
                {elem.workStart} - {elem.options === true ? '...' : elem.workEnd}
              </p>
              <p className="td3">
                <GiCancel className="icon" onClick={() => handleDelete(elem)} />
              </p>
            </div>
          </Zoom>
        ))
      )}
      <div className="save">
        <button className="save-data" onClick={handlePage}>
          Yeni iş yeri Əlavə et!<AiOutlinePlus className="icon" />
        </button>
      </div>
      <LinkButton
        nav={{
          state: { stageName: nextStageName, subStageName: nextSubStageName },
          path: { slugName: nextSlugName, subSlugName: nextSubSlugName },
        }}
        label="Növbəti"
        className="absolute right-0 -bottom-20"
      />
    </div>
  );
}

export default Experiences;
