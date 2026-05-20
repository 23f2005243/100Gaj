const getReplicateClient = async () => {
  const apiKey = process.env.REPLICATE_API_TOKEN;
  if (!apiKey) {
    throw new Error('Missing REPLICATE_API_TOKEN environment variable');
  }
  const Replicate = (await import('replicate')).default;
  return new Replicate({ auth: apiKey });
};

export const generateFloorPlan = async (req, res, next) => {
  try {
    const replicate = await getReplicateClient();
    const { 
      plotWidth, 
      plotLength, 
      bedrooms, 
      bathrooms, 
      hasGarden, 
      hasParking, 
      hasHall, 
      hasKitchen,
      otherRequirements 
    } = req.body;

    // Build the prompt for Stable Diffusion
    let prompt = `Create a detailed 2D floor plan architectural drawing for a residential plot. `;
    prompt += `Plot dimensions: ${plotWidth} x ${plotLength} feet. `;
    prompt += `Requirements: ${bedrooms} bedroom(s), ${bathrooms} bathroom(s). `;
    
    if (hasHall) prompt += `Include a living room/hall. `;
    if (hasKitchen) prompt += `Include a kitchen. `;
    if (hasGarden) prompt += `Include garden area. `;
    if (hasParking) prompt += `Include parking space. `;
    if (otherRequirements) prompt += `Additional requirements: ${otherRequirements}. `;
    
    prompt += `Show clear room boundaries, walls, doors, windows, and label each room. `;
    prompt += `Use a clean architectural blueprint style with black walls, white background. `;
    prompt += `Top-down view, detailed and professional floor plan.`;

    const output = await replicate.run(
      "stability-ai/stable-diffusion-3",
      {
        input: {
          prompt: prompt,
          num_outputs: 1,
        }
      }
    );

    res.status(200).json({
      success: true,
      imageUrl: output[0],
    });
  } catch (error) {
    console.error('Replicate Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate floor plan',
    });
  }
};
