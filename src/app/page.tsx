"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  ArrowRightIcon,
  CheckIcon,
  Columns2,
  Github,
  Grip,
  PlusIcon,
} from "lucide-react";
import { Heading } from "../components/typography/heading";
import { Paragraph } from "../components/typography/paragraph";
import Logo from "@/components/ui/Logo";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, filter: "blur(7px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        className="border-b sticky top-0 bg-white z-10"
        {...fadeIn}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            {/* <Link href="#">
              <Button variant="ghost" className="rounded-xl">
                Log in
              </Button>
            </Link> */}
            <Link href="/create">
              <Button className="rounded-xl">Create Form</Button>
            </Link>
            <Link href="https://github.com/shiva-bajpai/form-builder">
              <Github />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div className="max-w-3xl mx-auto" {...fadeIn}>
            <Heading size="large" className="mb-6">
              Build Powerful Job Forms with Ease.
            </Heading>
            <Paragraph size="large" className="text-[#71717A] mb-8">
              Drag-and-drop form creation, advanced customization, and seamless
              integrations—all at your fingertips.
            </Paragraph>
            <Link href="/create">
              <Button size="lg" className="rounded-xl">
                Get Started
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <motion.section {...fadeIn} className="bg-[#F4F4F5] py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  {...fadeIn}
                  transition={{ ...fadeIn.transition, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full">
                    <feature.icon className="size-10 text-primary mb-2.5" />
                    <Heading size="small" className="mb-2">
                      {feature.title}
                    </Heading>
                    <Paragraph size="small" className="text-[#71717A]">
                      {feature.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Highlights Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div className="max-w-4xl mx-auto" {...fadeIn}>
            <Heading size="large" className="mb-6">
              Why Choose Us?
            </Heading>
            <Paragraph size="base" className="text-[#71717A] mb-8">
              Unlock the power of seamless form creation and management with
              cutting-edge features designed for efficiency and simplicity.
            </Paragraph>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <Paragraph size="small">{highlight}</Paragraph>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer {...fadeIn} className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo />
            <div className="flex gap-6">
              {footer.map((footer) => (
                <Link
                  key={footer}
                  href="#"
                  className="text-sm text-[#71717A] hover:text-[#09090B]"
                >
                  {footer}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

const features = [
  {
    title: "Drag-and-Drop Builder",
    description:
      "Easily create forms with our intuitive drag-and-drop interface.",
    icon: Grip,
  },
  {
    title: "Customizable Fields",
    description: "Tailor form fields to meet your unique requirements.",
    icon: PlusIcon,
  },
  {
    title: "Interactive Previews",
    description:
      "Preview your form and ensure everything is perfect before publishing.",
    icon: Columns2,
  },
];

const highlights = [
  "User-friendly interface",
  "Customizable fields",
  "Secure data handling",
  "Responsive design",
];

const footer = ["Privacy Policy", "Terms of Service", "Contact"];
export default Home;
