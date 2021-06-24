module.exports = {
    details: async (req, res) => {
        //console.log(req.params.id);
        const cube = await req.storage.getById(req.params.id);

        if (cube == undefined) {
            res.redirect('/404');
        } else {
            const ctx = {
                title: 'Cubicle',
                cube
            };
            res.render('details', ctx);
        }
    },
    attach: async (req, res) => {
        const cube = await req.storage.getById(req.params.id);
        const accessories = await req.storage.getAllAccessories((cube.accessories || []).map(a => a._id));
        res.render('attach', {
            title: 'Attach Accessories',
            cube,
            accessories
        });
    },
    attachPost: async (req, res) => {
        const cubeId = req.params.cubeId;
        console.log(req.body.accessory);
        const accessoryId = req.body.accessory;

        await req.storage.attachAccessory(cubeId, accessoryId);
        
        res.redirect(`/details/${cubeId}`);
    }
};