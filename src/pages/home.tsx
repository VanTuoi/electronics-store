import { memo } from "react";

import { About, Introduce, Schedule, Services, TopProducts } from "~/components/pages";

const Home = memo(() => (
  <>
    <Introduce />
    <Schedule />
    <TopProducts />
    <About />
    <Services />
  </>
));

export default Home;
