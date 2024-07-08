import ice from "./../../../../assets/BASPhoto.webp";

function BASPhoto() {
    return (
      <div>
        <img
          data-test="browse-section-image"
          src={ice}
          alt="Browser All Category"
          loading="lazy"
          className="h-[200px] w-[350px] lg:h-[300px] lg:w-[500px] rounded-3xl"
        />
      </div>
    );
  }

  export default BASPhoto;