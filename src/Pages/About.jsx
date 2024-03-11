import AboutPict from '../Components/Assets/about.png'
export default function About() {
  return (
    <>
      <div className="About-page">
        <h2>About Abangku.Co</h2>
        <div className="side-page">
          <img src={AboutPict} alt="" />
          <p>
            Welcome to Abangku.co! We are your online destination for fashion style and comfort. With a collection of high quality products, we are here to meet your style needs at affordable prices. We are committed to providing an easy
            and enjoyable online shopping experience. Our team is ready to help you at every step of your shopping journey, from selecting products to completing payment. Not only that, we also care about environmental and social
            sustainability. We strive to maintain responsible business practices to create a better fashion world. Thank you for your support to Abangku.co. Lets explore the world of fashion together with unlimited confidence and style.
            Warm regards, Abangku.co Team
          </p>
        </div>
      </div>
    </>
  );
}
