import { TfiEmail } from "react-icons/tfi";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";

const About = () => {
  return (
    <div className="mx-10">
      {/* ABOUT Section */}
      <div className="py-12 bg-gray-100 dark:bg-gray-700 max-w-[1600px] mx-auto">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-700 dark:text-green-300">
              About Our Company
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              We are dedicated to providing top-quality products and services
              that exceed our expectations. Our commitment to excellence is
              reflected in every project we undertake.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-200 transition duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-semibold mb-4 dark:text-green-300 text-gray-700">
                Our Mission
              </h2>
              <p className="dark:text-green-300 text-gray-700">
                Our mission is to deliver innovative and high-quality products
                that enhance the lives of our customers.
              </p>
            </div>

            <div className="flex-1 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-200 transition duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-semibold mb-4 dark:text-green-300 text-gray-700">
                Our Vision
              </h2>
              <p className="dark:text-green-300 text-gray-700">
                Our vision is to be a global leader in our field, recognized for
                our commitment to quality, customer satisfaction, and
                sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="mt-20 max-w-[1580px] mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-2 p-1 border bg-slate-50 dark:bg-gray-700 text-green-300 dark:text-green-700">
          Our Team
        </h1>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center dark:bg-gray-700 bg-white">
          <div className="flex-1 p-4 border transition duration-300 ease-in-out transform hover:scale-105">
            <div
              className="relative mx-auto"
              style={{ height: "400px", width: "300px" }}
            >
              <img
                className="object-cover"
                style={{ height: "400px", width: "300px" }}
                src="https://i.ibb.co/T26QdqM/friendly-young-business-student-entrepreneur-260nw-2257917031.webp"
                alt="Team Member 1"
              />
            </div>
            <div className="bg-slate-50 dark:bg-gray-700 p-4">
              <h2 className="text-center text-2xl font-bold mb-2 text-green-300 dark:text-gray-700">
                Chef Executor
              </h2>
              <p className="text-center dark:text-green-300 text-gray-700">
                Our team is ready to treat you with a good product of sports. We
                are committed to delivering excellence in every interaction,
                ensuring you get the best service.
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 border transition duration-300 ease-in-out transform hover:scale-105">
            <div
              className="relative mx-auto"
              style={{ height: "400px", width: "300px" }}
            >
              <img
                className="object-cover"
                style={{ height: "400px", width: "300px" }}
                src="https://i.ibb.co/Zh1cQK8/photo-2023-09-03-19-55-32.jpg"
                alt="Team Member 2"
              />
            </div>
            <div className="bg-slate-50 dark:bg-gray-700 p-4">
              <h2 className="text-center text-2xl font-bold mb-2 dark:text-green-300 text-gray-700">
                Senior Instructor
              </h2>
              <p className="text-center text-green-300 dark:text-gray-700">
                Our dedicated team is passionate about providing top-quality
                sports products. We strive to exceed your expectations.
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 border transition duration-300 ease-in-out transform hover:scale-105">
            <div
              className="relative mx-auto"
              style={{ height: "400px", width: "300px" }}
            >
              <img
                className="object-cover "
                style={{ height: "400px", width: "300px" }}
                src="https://i.ibb.co/71wcwV6/beautiful-brunette-business-woman-entrepreneur-260nw-2256752029.webp"
                alt="Team Member 3"
              />
            </div>
            <div className="bg-slate-50 dark:bg-gray-700 p-4">
              <h2 className="text-center text-2xl font-bold mb-2 dark:text-green-300 text-gray-700">
                Team Leader
              </h2>
              <p className="text-center dark:text-green-300 text-gray-700">
                We take pride in offering the finest sports products, backed by
                a team that values your satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 p-8 bg-slate-50 dark:bg-gray-700">
        <div className="lg:w-1/2 p-6 bg-slate-50 dark:bg-gray-700 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 dark:text-green-300 text-gray-700">
            Contact Us
          </h2>
          <ul>
            <li className="flex items-center gap-4 mb-4 dark:text-green-300 text-gray-700">
              <TfiEmail />
              <span className="text-lg">info@sportproducts.com</span>
            </li>
            <li className="flex items-center gap-4 mb-4 dark:text-green-300 text-gray-700">
              <FaPhoneFlip />
              <span className="text-lg dark:text-green-300 text-gray-700">
                +123-456-7890
              </span>
            </li>
            <li className="flex items-center gap-4 dark:text-green-300 text-gray-700">
              <FaRegAddressCard />
              <span className="text-lg dark:text-green-300 text-gray-700 ">
                123 Sports Avenue, NY
              </span>
            </li>
          </ul>
        </div>
        <div className="lg:w-full p-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48327.22868242238!2d-73.935242
            !3d40.73061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0LIuMyrUtBPhkcjYDQ!5e0!3m2!1sen!2sus!4v1620307366544!5m2!1sen!2sus"
            width="100%"
            height="450"
            loading="lazy"
            className="rounded-lg shadow-lg"
            referrerPolicy="no-referrer-when-downgrade"
            title="map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
