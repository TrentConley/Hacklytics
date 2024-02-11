// pages/index.tsx

import Head from "next/head";
import Header from "../components/header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="px-4 py-12 mx-auto max-w-7xl">
        <section className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tighter montserrat">
              Easy Deep Learning
            </h1>
            <p className="mt-10 text-xl montserrat">
              Welcome to Easy Deep Learning, where simplicity meets
            </p>
            <p className="mt-10 text-xl montserrat font-bold">
              powerful image classification.
            </p>
          </div>
          <div className="">
            <Image
              src="/aiface.png"
              alt="Model Image"
              width={600}
              height={900}
              className="rounded-lg"
            />
          </div>
        </section>

        <div className="services-container flex justify-between mt-16 py-16">
          <div className="service-item text-center">
            <div className="image-container mx-auto rounded-full overflow-hidden w-24 h-24 bg-gray-300">
              <img
                src="/zerocode.png"
                alt="Zero Code"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-xl font-bold mt-4">Zero Code</h3>
            <p>
              Effortlessly fine-tune image classification models without any
              coding requirement.
            </p>
          </div>
          <div className="service-item text-center">
            <div className="image-container mx-auto rounded-full overflow-hidden w-24 h-24 bg-gray-300">
              <img
                src="/wrench.png"
                alt="Fine-tune AI"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-xl font-bold mt-4">Fine-tune AI</h3>
            <p>
              Refine AI models to meet specific needs with advanced fine-tuning
              capabilities.
            </p>
          </div>
          <div className="service-item text-center">
            <div className="image-container mx-auto rounded-full overflow-hidden w-24 h-24 bg-gray-300">
              <img
                src="/dataset.png"
                alt="Dataset Expansion"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-xl font-bold mt-4">Dataset Expansion</h3>
            <p>
              Expand your training dataset with our sophisticated image
              generation techniques.
            </p>
          </div>
          <div className="service-item text-center">
            <div className="image-container mx-auto rounded-full overflow-hidden w-24 h-24 bg-gray-300">
              <img
                src="/model.png"
                alt="Diverse Models"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-xl font-bold mt-4">Diverse Models</h3>
            <p>
              Choose from a wide range of models to find the perfect fit for
              your unique challenges.
            </p>
          </div>
        </div>
        <section className="mt-10">
          <h2 className="text-3xl font-bold">Description</h2>
          <p className="mt-2 text-lg">
            Our platform offers a seamless solution for individuals of all skill
            levels to fine-tune various image classification models
            effortlessly—no coding required. Simply upload your desired images
            for training, and watch as our platform leverages advanced
            techniques to generate additional training data through
            transformations and image-to-image generation. Utilizing a refined
            version of stable diffusion, our system produces images akin to your
            inputs, thereby expanding your training dataset. Choose from a
            selection of classification models, each meticulously curated with
            its advantages and drawbacks, empowering you to select the best fit
            for your requirements. Once trained, effortlessly deploy and test
            your model with new inputs to gauge its accuracy.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">Usage</h2>
          <p className="mt-2 text-lg">
            Easy Deep Learning excels in scenarios where users lack extensive
            deep learning expertise and access to substantial training datasets.
            For instance, in disaster response situations, where first
            responders may not possess technical proficiency and aerial views of
            affected areas are limited. By capturing a few drone images of the
            damaged regions and training a model, users can efficiently identify
            additional affected areas, potentially saving both resources and
            lives.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">Technologies Used</h2>
          <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
            <li>Intel Developer Cloud</li>
            <li>AWS</li>
            <li>Firebase</li>
            <li>Flask</li>
            <li>Next.js</li>
            <li>Stable Diffusion</li>
            <li>MKL</li>
            <li>VGG-16</li>
            <li>Google Vision Transformer</li>
          </ul>
        </section>

        <section className="mt-10 flex justify-center">
          <Link href="/train">
            <a className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg">
              Get Started
            </a>
          </Link>
        </section>
      </main>

      <footer className={`text-center p-4`}>
        © {new Date().getFullYear()} Easy Deep Learning. All rights reserved.
      </footer>
    </div>
  );
}
