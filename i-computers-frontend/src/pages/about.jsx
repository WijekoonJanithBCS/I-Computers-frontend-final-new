export default function AboutPage() {
  return (
    <div className="w-full min-h-screen">
      <h1 className="text-3xl font-bold text-center mt-10 text-blue-400">
        About Us
      </h1>
      <p className="text-center mt-5 px-10 text-blue-400">
        Welcome to our computer store! We are dedicated to providing the best
        quality computers and accessories to meet your needs. Our team of
        experts is here to help you find the perfect product for your home or
        office. Thank you for choosing us!
      </p>
      <p className="mt-5 px-10 text-blue-400 text-center">
        We are a team of passionate tech enthusiasts who love what we do. Our
        mission is to make high-quality technology accessible to everyone.our
        services are listed as points below<br/>
        - We provide a wide range of computers and accessories to meet your
        needs.<br/> 

        E-mail : i-computers@gmail.com<br/>
        Contact - 077-1234567
      </p><br/>
      <div className="flex justify-center mt-5">
            <Link
                to="/"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            
                Go to Home
            </Link>
        </div>
     
      <div className="flex justify-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRMQ5fCqRfnoKD-cbREaslm-x2mRhOKrytiHSQDzMjGQ&s=10" alt="About Us" className="w-60% h-20% " />
      </div>
    </div>
  );
}
