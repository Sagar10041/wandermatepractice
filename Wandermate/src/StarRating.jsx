const StarRating = ({ rating }) => {
    const totalStars = 5;
  
    const renderStars = () => {
      let stars = [];
      for (let i = 0; i < totalStars; i++) {
        if (rating > i) {
          stars.push(
            <span key={i} className="font-normal text-yellow-400">
              &#9733;
            </span>
          );
        } else {
          stars.push(
            <span key={i} className="font-normal text-gray-300">
              &#9733;
            </span>
          );
        }
      }
      return stars;
    };
  
    return <div>{renderStars()}</div>;
  };
  
  export default StarRating;
  