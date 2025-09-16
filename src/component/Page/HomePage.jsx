import UploadSection from "../molecule/UploadSection";
import DiscussionForumSection from "../organism/DiscussionForumSection";
import HeroSection from "../organism/HeroSection";
import ProblemOfTheDaySection from "../organism/ProblemOfTheDay";

const HomePage = () => {
  return (
<>
<HeroSection/>
<ProblemOfTheDaySection/>
<UploadSection/>
<DiscussionForumSection/>

</>
  )
};
export default HomePage;
