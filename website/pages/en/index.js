/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class Index extends React.Component {
    render() {
        const {config: siteConfig, language = ''} = this.props;
        const {baseUrl} = siteConfig;

        const Block = props => (
            <Container
                padding={['bottom']}
                id={props.id}
                background={props.background}>
                <GridBlock
                    align="center"
                    contents={props.children}
                    layout={props.layout}
                />
            </Container>
        );

        const Features = () => (
            <div>
                <Block layout="threeColumn">
                    {[
                        {
                            content: 'A set of different [NRPE](https://exchange.nagios.org/directory/Addons/Monitoring-Agents/NRPE--2D-Nagios-Remote-Plugin-Executor/details) implementations compatible with the original one ',
                            image: `${baseUrl}img/nagios-logo.png`,
                            imageLink: '/docs/nrpe/implementations',
                            imageAlign: 'top',
                            title: `<a href="/docs/nrpe/implementations">Nagios NRPE implementations</a>`,
                        },
                    ]}
                </Block>
                <Block layout="threeColumn">
                    {[
                        {
                            content: 'A Java NRPE implementation that allows the execution of plugins written with Java without the overhead of a new JVM for each plugin execution',
                            image: `${baseUrl}img/java.svg`,
                            imageAlign: 'top',
                            imageLink: `${baseUrl}jnrpe`,
                            title: `<a href="${baseUrl}jnrpe">JNRPE</a>`,
                        },
                        {
                            content: 'A javascript implemenentation of NRPE that allows to easily execute plugins written in javascript',
                            image: `${baseUrl}img/javascript.svg`,
                            imageAlign: 'top',
                            imageLink: `${baseUrl}jsnrpe`,
                            title: `<a href="${baseUrl}jsnrpe">jNRPE</a>`,
                        },
                        {
                            content: 'A C++ implementation of NRPE based on boost ASIO libraries',
                            image: `${baseUrl}img/cpp.png`,
                            imageAlign: 'top',
                            imageLink: `${baseUrl}nrpe_plus`,
                            title: `<a href="${baseUrl}nrpe_plus">NRPE++</a>`,
                        },
                    ]}
                </Block>
            </div>
        );

        return (
            <div>
                <div className="mainContainer">
                    <Features />
                </div>
            </div>
        );
    }
}

module.exports = Index;