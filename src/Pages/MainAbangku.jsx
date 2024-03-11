import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import NewCollection from "../Category/NewCollection";
import InformationSect from "../Components/InformationSect/InformationSect";
import ModelCaption from "../Components/Modelcaption/ModelCaption";
import ItemNextMounth from "../Category/ItemNextMonth";
export default function Product() {
  return (
    <>
      <Hero />
      <Popular />
      <NewCollection />
      <ModelCaption/>
      <InformationSect />
      <ItemNextMounth/>

    </>
  );
}
