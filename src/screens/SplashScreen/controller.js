const TimeOut = (props) => {
    const { navigation } = props;
    const timer = setTimeout(() => {
        navigation.navigate('Landing');
    }, 5000);

    return () => clearTimeout(timer);
};

export { TimeOut };