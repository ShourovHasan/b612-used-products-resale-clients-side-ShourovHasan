import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import Loading from '../SharedPages/Loading/Loading';

const Blog = () => {
    const { loading } = useContext(AuthContext);
    useTitle('Blog');
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div className='my-12'>
            <h2 className='mb-10 text-2xl font-bold text-center lg:text-5xl md:text-4xl text-primary'>Frequently Asked Questions</h2>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                <div className="neumorphism_Banner_Card card bg-base-100 ">
                    <div className="card-body">
                        <h2 className="card-title">What are the different ways to manage a state in a React application?</h2>
                        <p>There are several ways to manage state in a React application:</p>
                        <ul className='ml-6 list-disc list-outside marker:text-green'>
                            <li>
                                Use a state management library like Redux or MobX. These libraries provide a way to manage state in a central place, making it easier to reason about your application.
                            </li>
                            <li>
                                Use React's built-in state management features. React provides a way to manage state within components using the setState() method.
                            </li>
                            <li>
                                Use a combination of both state management libraries and React's built-in state management features. This allows you to take advantage of the benefits of both approaches.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="shadow-xl card bg-base-100 shadow-neutral">
                    <div className="card-body">
                        <h2 className="card-title">How does prototypical inheritance work?</h2>
                        <ul className='ml-6 list-disc list-outside marker:text-green'>
                            <li>
                                In prototypical inheritance, each object has a prototype property, which references another object. When trying to access a property on an object, if that property does not exist, JavaScript will check the prototype property of that object to see if the property exists on the prototype object. If it does, it will return the value of that property. If the property does not exist on the prototype object, it will continue to check the prototype property of the prototype object, and so on, until it either finds the property or reaches the end of the prototype chain.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="shadow-xl card bg-base-100 shadow-neutral">
                    <div className="card-body">
                        <h2 className="card-title">What is a unit test? Why should we write unit tests?</h2>
                        <ul className='ml-6 list-disc list-outside marker:text-green'>
                            <li>
                                A unit test is a piece of code that tests a single functionality of your program. It is usually written by the developers themselves as they are building the program, to make sure that the functionality they are working on is working correctly. <br />
                                Unit tests are important because they ensure that individual pieces of code are functioning as expected. This is especially important as code is being added or changed, as it can help to identify issues early on. Additionally, unit tests can be run automatically and repeatedly, which can save time and help to find issues that might otherwise be missed.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="shadow-xl card bg-base-100 shadow-neutral">
                    <div className="card-body">
                        <h2 className="card-title">React vs. Angular vs. Vue?</h2>
                        <ul className='ml-6 list-disc list-outside marker:text-green'>
                            <li>
                                React is a JavaScript library for building user interfaces, while Angular and Vue are JavaScript frameworks.
                            </li>
                            <li>
                                React is used by Facebook and Instagram, Angular is used by Google, and Vue is used by Alibaba.
                            </li>
                            <li>
                                React has a smaller community, while Angular and Vue have larger communities.
                            </li>
                            <li>
                                React is easier to learn, while Angular and Vue are more difficult to learn.
                            </li>
                            <li>
                                React is more flexible, while Angular and Vue are more opinionated.
                            </li>
                            <li>
                                React is faster, while Angular and Vue are slower.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;