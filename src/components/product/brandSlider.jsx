import Marquee from "react-fast-marquee";
import { brands } from "../data/Data";
const BrandSillder = () => {
  return (
    <>
      <div>
        <Marquee behavior="scroll" direction="left" speed={90}>
          {brands.map((item) => (
            <div key={item._id}>
              <img
                src={item.image}
                style={{
                  width: "100%",
                  height: "100px",
                  display: "block",
                  marginRight: "80px",
                }}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default BrandSillder;
