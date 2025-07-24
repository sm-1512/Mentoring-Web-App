import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";


const AddMentor = () => {
  const [mentorImg, setMentorImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [company, setCompany] = useState("");
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState("");
  const [gradYear, setGradYear] = useState("");

  const { aToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!mentorImg) return toast.error("Image Not Selected");

      const formData = new FormData();
      formData.append("image", mentorImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("currentCompany", company);
      formData.append("college", college);
      formData.append("degree", degree);
      formData.append("branch", branch);
      formData.append("graduationYear", gradYear);

      // console log formdata
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-mentor`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setMentorImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setCompany("");
        setCollege("");
        setDegree("");
        setBranch("");
        setGradYear("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium text-white">Add Mentor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="mentor-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={
                mentorImg ? URL.createObjectURL(mentorImg) : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => setMentorImg(e.target.files[0])}
            type="file"
            id="mentor-img"
            hidden
          />
          <p>
            Upload mentor <br /> picture
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* Column 1 */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <p>Your name</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div>
              <p>Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <p>Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div>
              <p>Experience</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border rounded px-2 py-2 w-full"
              >
                {[
                  "1 Year",
                  "2 Year",
                  "3 Year",
                  "4 Year",
                  "5 Year",
                  "6 Year",
                  "8 Year",
                  "9 Year",
                  "10 Year",
                ].map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Fees</p>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="number"
                placeholder="Mentor fees"
                required
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <p>Current Company</p>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                list="company-options"
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Company"
              />

              <datalist id="company-options">
                <option value="Google" />
                <option value="Amazon" />
                <option value="Microsoft" />
                <option value="Apple" />
                <option value="Meta" />
                <option value="Netflix" />
                <option value="Adobe" />
                <option value="Nvidia" />
                <option value="Salesforce" />
                <option value="Intel" />
                <option value="TCS" />
                <option value="Infosys" />
                <option value="Wipro" />
                <option value="HCL Technologies" />
                <option value="Tech Mahindra" />
                <option value="Capgemini" />
                <option value="Cognizant" />
                <option value="Accenture" />
                <option value="LTI Mindtree" />
                <option value="IBM" />
                <option value="Razorpay" />
                <option value="PhonePe" />
                <option value="Groww" />
                <option value="CRED" />
                <option value="Zerodha" />
                <option value="Paytm" />
                <option value="Meesho" />
                <option value="Zomato" />
                <option value="Swiggy" />
                <option value="Ola" />
                <option value="Samsung R&D" />
                <option value="Oracle" />
                <option value="Siemens" />
                <option value="Cisco" />
                <option value="VMware" />
                <option value="SAP" />
                <option value="Deloitte" />
                <option value="EY (Ernst & Young)" />
                <option value="KPMG" />
                <option value="PwC" />
                <option value="Freelancer" />
                <option value="Startup" />
                <option value="Self-employed" />
                <option value="College Placement Cell" />
                <option value="Internshala" />
                <option value="Remote Job" />
                <option value="Not Working Currently" />
              </datalist>
            </div>

            <div>
              <p>College</p>
              <input
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="College"
              />
            </div>

            <div>
              <p>Degree</p>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Degree"
              />
            </div>

            <div>
              <p>Branch</p>
              <input
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Branch"
              />
            </div>

            <div>
              <p>Graduation Year</p>
              <input
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="number"
                placeholder="e.g. 2025"
                min="1950"
                max={new Date().getFullYear() + 10}
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <p className="mt-4 mb-2">About Mentor</p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-4 pt-2 border rounded"
            rows={5}
            placeholder="Write about mentor"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-secondary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add mentor
        </button>
      </div>
    </form>
  );
};

export default AddMentor;
