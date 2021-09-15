import styles from './ShowStoryDetails.module.css';

const ShowStoryDetails = () => {
    return (
        <>
            <div className = {styles.container}>
                <h1 className = 'heading-1' id = {styles.title}>
                    Title of Success Story
                </h1>
                <hr color = "brand-default" className = {styles.bar}/>
                <div className = {styles.userInfo}>
                    <img 
                        className = {styles.userPhoto}
                        src = "https://cdn-icons-png.flaticon.com/128/2948/2948035.png"
                        alt = ""
                    />
                    <h4 className = 'heading-4' id = {styles.username}>
                        Username
                    </h4>
                </div>
                <img 
                    className = {styles.storyPhoto}
                    src = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'
                    alt = ''
                /> 
                <div className = {styles.rectangleForTags}>
                    <span className = 'caption' id = {styles.tagLabel}>Tags:</span>
                    <div className = {styles.tags}>
                        <span className = 'caption'>dog</span>
                    </div>
                    <div className = {styles.tags}>
                        <span className = 'caption'>field</span>
                    </div>
                    <div className = {styles.tags}>
                        <span className = 'caption'>flowers</span>
                    </div>
                </div>
                <p className = "paragraph" id = {styles.storyDetails}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim venenatis pellentesque nulla eget neque 
                adipiscing. Vivamus lacus eu nunc enim neque, lectus. Velit proin gravida risus donec enim faucibus 
                elementum egestas odio. Adipiscing placerat a tempus aenean sagittis, sem elementum. Sed sit nunc turpis nec. 
                Amet mollis mi iaculis tempor ipsum. Fringilla facilisis leo tempor feugiat. Nibh nunc, morbi orci turpis. 
                Nunc mauris egestas proin lectus enim nec sapien sagittis molestie. Luctus penatibus odio lectus risus. 
                Massa feugiat nibh tellus auctor duis. Massa proin pellentesque aliquet molestie magna adipiscing amet, vel.
				</p>
                <p className = "paragraph" id = {styles.storyDetails}>
                Erat phasellus ac nibh maecenas sem ipsum scelerisque porttitor. Dignissim porttitor sit eu mauris venenatis 
                leo sed. Senectus elementum nunc neque ut morbi. Lacus nibh ut feugiat elementum nibh iaculis hendrerit. 
                Ante sed cursus vitae leo blandit. Magnis lectus sem libero scelerisque pulvinar. Ullamcorper in amet lectus 
                leo amet in diam. Orci ultrices ipsum nunc sed sit fringilla sit sagittis.
                </p>
                <p className = "paragraph" id = {styles.storyDetails}>
                Eleifend facilisis quisque fermentum, vel. Dui eu est in velit, in non. Tortor sed amet adipiscing turpis. 
                Amet, laoreet aliquam id tellus. Laoreet sit pretium ac id blandit velit hendrerit cursus. Ut amet eget 
                volutpat id porttitor metus diam, netus sed. Tellus condimentum vulputate erat mollis tincidunt augue donec 
                mauris. Felis aenean tempor, facilisis phasellus ac sed sollicitudin accumsan. Amet donec neque maecenas 
                ultricies duis sed venenatis odio pellentesque. Elementum, mattis risus cras accumsan. Tellus et faucibus 
                venenatis sollicitudin elementum aliquet feugiat. Nibh nec varius vitae dis pulvinar tellus in. Tellus urna,
                tempus ornare eu proin lacus phasellus nibh. Massa scelerisque consequat fermentum vulputate tempus eget ac id 
                vel. Non dui et ultricies eget eu.
                </p>
            </div>
        </>
    )
}

export default ShowStoryDetails;