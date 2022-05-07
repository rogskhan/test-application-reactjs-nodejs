const Helper =  {
    addMinutes(d, m) {
        return new Date(d.getTime() + m*60000);
    }
}

export default Helper