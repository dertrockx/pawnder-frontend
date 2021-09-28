import styles from './ShowStoryDetails.module.css';
import { useParams } from 'react-router-dom';
import StoryDetailsTag from 'components/StoryDetailsTags';

const ShowStoryDetails = ({ data }) => {
    const { id } = useParams();
    console.log(id);
    return (
        <>
            {
                data 
                    .filter(story => (story.id === parseInt(id)))
                    .map(story => (
                        <>
                            {console.log(story.id)}
                            <div className = {styles.container}>
                                <h1 className = 'heading-1' id = {styles.title}>
                                    {story.title}
                                </h1>
                                <hr color = "brand-default" className = {styles.bar}/>
                                <div className = {styles.userInfo}>
                                    <img 
                                        className = {styles.userPhoto}
                                        src = "https://cdn-icons-png.flaticon.com/128/2948/2948035.png"
                                        alt = ""
                                    />
                                    <h4 className = 'heading-4' id = {styles.username}>
                                        {story.institutionName}
                                    </h4>
                                </div>
                                <img 
                                    className = {styles.storyPhoto}
                                    src = {story.headlineURL}
                                    alt = ''
                                /> 
                                <div className = {styles.rectangleForTags}>
                                    <span className = 'caption' id = {styles.tagLabel}>Tags:</span>
                                    <StoryDetailsTag data = {story.tags}/>
                                </div>
                                <p className = "paragraph" id = {styles.storyDetails}>
                                {story.body}
                                </p>
                            </div>
                        </>
                    ))
            }
        </>
    )
}

export default ShowStoryDetails;