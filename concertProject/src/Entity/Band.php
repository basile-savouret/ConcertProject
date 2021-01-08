<?php

namespace App\Entity;

use App\Repository\BandRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=BandRepository::class)
 */
class Band
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("normalized")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("normalized")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("normalized")
     */
    private $style;

    /**
     * @ORM\Column(type="blob", nullable=true)
     */
    private $picture;

    /**
     * @ORM\Column(type="integer")
     * @Groups("normalized")
     */
    private $yearOfCreation;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("normalized")
     */
    private $lastAlbumName;

    /**
     * @ORM\ManyToMany(targetEntity=Member::class, mappedBy="band")
     * @Groups("normalized")
     */
    private $members;

    /**
     * @ORM\OneToMany(targetEntity=Show::class, mappedBy="band", orphanRemoval=true)
     */
    private $shows;

    public function __construct()
    {
        $this->members = new ArrayCollection();
        $this->shows = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getStyle(): ?string
    {
        return $this->style;
    }

    public function setStyle(string $style): self
    {
        $this->style = $style;

        return $this;
    }

    public function getPicture()
    {
        return $this->picture;
    }

    public function setPicture($picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getYearOfCreation(): ?int
    {
        return $this->yearOfCreation;
    }

    public function setYearOfCreation(int $yearOfCreation): self
    {
        $this->yearOfCreation = $yearOfCreation;

        return $this;
    }

    public function getLastAlbumName(): ?string
    {
        return $this->lastAlbumName;
    }

    public function setLastAlbumName(?string $lastAlbumName): self
    {
        $this->lastAlbumName = $lastAlbumName;

        return $this;
    }

    /**
     * @return Collection|Member[]
     */
    public function getMembers(): Collection
    {
        return $this->members;
    }

    public function addMember(Member $member): self
    {
        if (!$this->members->contains($member)) {
            $this->members[] = $member;
            $member->addBand($this);
        }

        return $this;
    }

    public function removeMember(Member $member): self
    {
        if ($this->members->removeElement($member)) {
            $member->removeBand($this);
        }

        return $this;
    }

    /**
     * @return Collection|Show[]
     */
    public function getShows(): Collection
    {
        return $this->shows;
    }

    public function addShow(Show $show): self
    {
        if (!$this->shows->contains($show)) {
            $this->shows[] = $show;
            $show->setBand($this);
        }

        return $this;
    }

    public function removeShow(Show $show): self
    {
        if ($this->shows->removeElement($show)) {
            // set the owning side to null (unless already changed)
            if ($show->getBand() === $this) {
                $show->setBand(null);
            }
        }

        return $this;
    }
}
