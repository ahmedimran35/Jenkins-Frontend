import ResDescription from "./responsiveComponents/ResDescription";
import ResInformation from "./responsiveComponents/ResInformation";
import ResLegal from "./responsiveComponents/ResLegal";
import ResSocialMedia from "./responsiveComponents/ResSocialMedia";
import ResSupportLinks from "./responsiveComponents/ResSupportLinks";
import ResCopyRightedText from "./responsiveComponents/ResCopyRightedText";

const ResponsiveFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="w-full rounded bg-black shadow-md">
        <ResDescription />
        <ResInformation />
        <ResLegal />
        <ResSupportLinks />
        <ResSocialMedia />
        <ResCopyRightedText currentYear={currentYear} />
      </footer>
    </>
  );
};

export default ResponsiveFooter;
