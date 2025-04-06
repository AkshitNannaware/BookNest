import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className='Hero'>
            <div className="conatiner">
                {/* Animated Left Side */}
                <motion.div
                    className="H-left"
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    <div className="H-title">
                        <motion.h1
                            className="gradient-text"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            Discover <br />Most Suitable <br />Property
                        </motion.h1>

                        <motion.span
                            className='black'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                        >
                            Find a variety of properties that suits your interest.
                        </motion.span> <br />

                        <motion.span
                            className='black'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.3, duration: 1 }}
                        >
                            Forget all difficulties in finding a residence for you.
                        </motion.span>
                    </div>
                </motion.div>

                {/* Animated Right Side Image */}
                <motion.div
                    className="H-right"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <div className="H-image">
                        <img
                            src="https://5.imimg.com/data5/SELLER/Default/2020/12/GT/AM/NY/117268287/best-apartments-and-flats-construction-company-in-india.jpg"
                            alt="property"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero;
