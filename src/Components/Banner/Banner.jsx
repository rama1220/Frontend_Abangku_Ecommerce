import Banner1 from "../../Components/Assets/banner1.jpg";
import Banner2 from "../../Components/Assets/banner2.jpg";
import Banner3 from "../../Components/Assets/banner3.jpg";
import Banner4 from "../../Components/Assets/banner4.jpg";
import Banner5 from "../../Components/Assets/banner5.jpg";
import Banner6 from "../../Components/Assets/banner6.jpg";
import Banner7 from "../../Components/Assets/banner7.jpg";
import Banner8 from "../../Components/Assets/banner8.jpg";
import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function Banner() {
  const [bannerSection, setBannerSection] = useState("");
  const { pageBanner } = useAuth();

  useEffect(() => {
    if (pageBanner === 1) {
      setBannerSection(Banner1);
    } else if (pageBanner === 2) {
      setBannerSection(Banner2);
    } else if (pageBanner === 3) {
      setBannerSection(Banner3);
    } else if (pageBanner === 4) {
      setBannerSection(Banner4);
    } else if (pageBanner === 5) {
      setBannerSection(Banner5);
    } else if (pageBanner === 6) {
      setBannerSection(Banner6);
    } else if (pageBanner === 7) {
      setBannerSection(Banner7);
    } else if (pageBanner === 8) {
      setBannerSection(Banner8);
    }
  }, [pageBanner]);

  return (
    <div>
      <img src={bannerSection} alt="" />
    </div>
  );
}
