using Domain;
using FluentValidation;

namespace Application.Photos
{
    public class PhotoValidator : AbstractValidator<Photo>
    {
        public PhotoValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Url).NotEmpty();
        }
    }
    
}