import YTShopsDescription from "./componentsOfMainFooter/YTShopsDescription";
import SupportSection from "./componentsOfMainFooter/SupportSection";
import LegalSection from "./componentsOfMainFooter/LegalSection";
import SocialMediaIcons from "./componentsOfMainFooter/SocialMediaIcons";
import InformationSection from "./componentsOfMainFooter/InformationSection";
import CopyRightedText from "./componentsOfMainFooter/CopyRightedText";
import BottomRightLinks from "./componentsOfMainFooter/BottomRightLinks";

const MainFooterlayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className=" max-w-[750px] lg:max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start text-white md:gap-10 px-3 pt-5">
        {/* sect1 */}
        <YTShopsDescription />

        {/* sect2 */}
        <InformationSection />

        {/* sect3 */}
        <LegalSection />

        {/* sect4 */}
        <SupportSection />
      </div>
      <hr />
      <div className="flex flex-col md:flex-row  justify-between h-fit md:h-20 text-zinc-300 md:px-6 lg:px-3 space-y-4 py-6">
        <SocialMediaIcons />
        <CopyRightedText currentYear={currentYear}></CopyRightedText>
        <BottomRightLinks />
      </div>
    </div>
  );
};

export default MainFooterlayout;
