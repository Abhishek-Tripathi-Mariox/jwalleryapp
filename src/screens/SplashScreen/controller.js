const TimeOut = (props) => {
    const { navigation } = props;
    const timer = setTimeout(() => {
        navigation.navigate('Landing');
    }, 3000);

    return () => clearTimeout(timer);
};

export { TimeOut };