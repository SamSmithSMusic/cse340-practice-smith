const demo = (req, res) => {
    const title = 'Demo Page' ;
    const { color, food } = req.params;
    res.render('demo',{title, color, food});
};

export default {demo};