const ApiResponse = require('../dto/ApiResponse');
const areaCatService = require('../services/areaCatService');
const catchAsync = require('../utils/catchAsync/catchAsync');

exports.getAllAreaCats = catchAsync(async (req, res) => {
  const areaCats = await areaCatService.getAllAreaCats();
  res.send(new ApiResponse(200, 'Get all areaCats successfully', areaCats));
});

exports.searchAreaCats = catchAsync(async (req, res) => {
  const { areaId, catId, time } = req.query;
  console.log(areaId, catId);
  const areaCat = await areaCatService.searchAreaCat(areaId, catId, time);
  if (!areaCat) {
    res.status(404).send(new ApiResponse(404, 'AreaCat not found', null));
  } else {
    res.send(
      new ApiResponse(
        200,
        'Get areaCat by catId, areaId successfully',
        areaCat,
      ),
    );
  }
});

exports.createAreaCat = catchAsync(async (req, res) => {
  const areaCat = await areaCatService.createAreaCat(req.body);
  res.send(ApiResponse.success('Create areaCat successfully', areaCat));
});

exports.updateAreaCat = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedAreaCat = await areaCatService.updateAreaCat(id, req.body);
  if (!updatedAreaCat) {
    res.status(404).send(new ApiResponse(404, 'AreaCat not found', null));
  } else {
    res.send(
      ApiResponse.success('Update areaCat successfully', updatedAreaCat),
    );
  }
});

exports.deleteAreaCat = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedAreaCat = await areaCatService.deleteAreaCat(id);
  if (!deletedAreaCat) {
    res.status(404).send(new ApiResponse(404, 'AreaCat not found', null));
  } else {
    res.send(
      ApiResponse.success('Delete areaCat successfully', deletedAreaCat),
    );
  }
});
