import PropTypes from "prop-types"
function Category({ category }) {
  return (
   <div className="relative" >
     <div
      className="h-80 shadow-sm border border-[#000000] flex justify-center items-center hover:brightness-90  rounded-lg font-[500] 
      hover:text-white 
       
      max-w-lg
      mx-auto
      overflow-hidden 
      bg-cover       
      bg-no-repeat 
      flex-col"
      >
        <img
          src={category?.style?.backgroundImage}
          alt={category?.text}
          loading="lazy"
          className="lg:object-cover w-full h-full"
        />
        
      </div><h2 className="text-xl text-[#efe6e6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 my-auto hover:text-white transition duration-300 ease-in-out hover:scale-110 text-center">
          {category.text}
        </h2>
   </div>
    );
  }

Category.propTypes = {
  category: PropTypes.object
}


export default Category;