import { memo } from "react";

export const About = memo(() => (
  <section className="ftco-section ftco-about bg-light">
    <div className="container">
      <div className="row no-gutters">
        <div className="col-md-6 p-md-5 d-flex justify-content-center align-items-center">
          <img src="imgs/bg/bg2.png" alt="Background" className="img-fluid w-100 h-100 object-fit-cover rounded-2" />
        </div>

        <div className="col-md-6 wrap-about">
          <div className="heading-section heading-section-white pl-md-5">
            <span className="subheading py-1">Thông tin về chúng tôi</span>
            <h4 className="mb-4">Chào mừng đến với Electronics Store</h4>

            <p>
              Electronics Store là dự án xuất phát từ ý tưởng của bản thân chúng tôi, những sinh viên xuất thân từ Đại
              học Cần Thơ, với mong muốn đem đến những thiết kế tủ điện có thể tiếp cận với đa số mọi người, chúng tôi
              luôn chú trọng đến chất lượng sản phẩm và giá thành hợp lý nhất.
            </p>
            <p>
              Đồng thời, hiểu được sự khó khăn của các bạn sinh viên trong quá trình học tập và thực hiện các đồ án, bên
              mình cũng hỗ trợ giúp các bạn lên ý tưởng và đề xuất các thành phần linh kiện cần thiết cho các dự án của
              mình. Bên cạnh đó chúng mình cũng cam kết hỗ trợ các bạn khắc phục sự cố khi sử dụng sản phẩm của chúng
              mình.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
));
