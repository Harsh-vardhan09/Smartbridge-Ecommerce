export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find(); 
    res.json(banners[0]?.image || '');  
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch banners' });
  }
};
