import '../../WorkExperience/components/Experiences/styles.css';
import { GiCancel } from 'react-icons/gi';
import NotFound from '../../WorkExperience/components/NotFound';
import { AiOutlinePlus } from 'react-icons/ai';
import { Zoom } from 'react-awesome-reveal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { EducationItem, removeEducation } from 'state/dataSlice';
import { useGetStageQuery } from '../../../../services/stage';
import { GeneralQuestionsFormProps } from "../../Education/GeneralQuestionsForm"
import { apg } from 'state/dataSlice';
import LinkButton from "../../../LinkButton";
interface RootState {
	dataa: {
		education: [];
	};
}
const Educations: React.FC<GeneralQuestionsFormProps> = ({ stageIndex, subStageSlug }) => {
	const { data: stagesData } = useGetStageQuery();
	const education: EducationItem[] = useSelector((state: RootState) => state.dataa.education);
	const dispatch: Dispatch = useDispatch();
	const {
		slug: slugName,
		stage_name: stageName,
		stage_children,
	} = stagesData?.[stageIndex] || {};
	const { slug: subSlugName, stage_name: subStageName } =
		stage_children?.[stageIndex + 2] || {};
	
	const { slug: prevSubSlugName, stage_name: prevSubStageName } =
		stage_children?.[stageIndex] || {};
	const handleDelete = (elem: EducationItem) => {
		dispatch(removeEducation(elem));
	};
	const handleClick = () => {
		dispatch(apg(1));
		
	};
	return (
		<div className="experienceTable">
			{education.length === 0 ? (
				<NotFound />
			) : (
				education.map((elem, id) => (
					<Zoom duration={1000} key={id} className="tb">
						<div className="tablee">
							<p className="td1">
								{elem.id}.{elem.university}
							</p>
							<p className="td2">
								{elem.start} - {elem.reading === true ? '...' : elem.end}
							</p>
							<p className="td3">
								<GiCancel
									className="icon"
									onClick={() => handleDelete(elem)}
									style={{ color: 'red' }}
								/>
							</p>
						</div>
					</Zoom>
				))
			)}
			<div className="save" onClick={() => handleClick()}>
			<LinkButton
        nav={{
          state: { stageName, subStageName },
          path: { slugName, subSlugName: prevSubSlugName },
        }}
        type="outline"
        
        label="Əlavə Et! +"
        className="elaveEt"
      />
			</div>
		</div>
	);
}
export default Educations;
