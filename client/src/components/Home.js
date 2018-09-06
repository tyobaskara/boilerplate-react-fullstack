import React from 'react';
import View from '../layout/View';
import { Helmet } from 'react-helmet';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../actions/profilesActions';

class Home extends React.Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        return (
            <View>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                
                <Container>
                    <h1>Hello React</h1>
                </Container>
            </View>
        );
    }

};

Home.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { getProfiles })(Home);